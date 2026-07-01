// Small, dependency-free ML routines used by the interactive modules.
// These run the real algorithms on the real bundled datasets.

export type Point2 = { x: number; y: number };
export type LabeledPoint = Point2 & { label: number };

/** k-nearest-neighbours classification for a single query point. */
export function knnClassify(
  train: LabeledPoint[],
  qx: number,
  qy: number,
  k: number,
  numClasses: number
): number {
  const dists = train.map((p) => ({
    label: p.label,
    d: (p.x - qx) ** 2 + (p.y - qy) ** 2,
  }));
  dists.sort((a, b) => a.d - b.d);
  const votes = new Array(numClasses).fill(0);
  for (let i = 0; i < Math.min(k, dists.length); i++) votes[dists[i].label]++;
  let best = 0;
  for (let c = 1; c < numClasses; c++) if (votes[c] > votes[best]) best = c;
  return best;
}

/** Ordinary least squares for simple linear regression y = w*x + b. */
export function olsFit(points: Point2[]): { w: number; b: number } {
  const n = points.length;
  let sx = 0;
  let sy = 0;
  let sxx = 0;
  let sxy = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
    sxx += p.x * p.x;
    sxy += p.x * p.y;
  }
  const denom = n * sxx - sx * sx || 1;
  const w = (n * sxy - sx * sy) / denom;
  const b = (sy - w * sx) / n;
  return { w, b };
}

export function mse(points: Point2[], predict: (x: number) => number): number {
  let s = 0;
  for (const p of points) s += (predict(p.x) - p.y) ** 2;
  return s / (points.length || 1);
}

/** One gradient-descent step for y = w*x + b on standardized inputs. */
export function gdStep(
  points: Point2[],
  w: number,
  b: number,
  lr: number
): { w: number; b: number } {
  let dw = 0;
  let db = 0;
  const n = points.length || 1;
  for (const p of points) {
    const err = w * p.x + b - p.y;
    dw += err * p.x;
    db += err;
  }
  dw = (2 * dw) / n;
  db = (2 * db) / n;
  return { w: w - lr * dw, b: b - lr * db };
}

/** Solve a linear system A x = y via Gaussian elimination with partial pivoting. */
export function solveLinearSystem(A: number[][], y: number[]): number[] {
  const n = y.length;
  const M = A.map((row, i) => [...row, y[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    [M[col], M[pivot]] = [M[pivot], M[col]];
    const pv = M[col][col] || 1e-9;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = M[r][col] / pv;
      for (let c = col; c <= n; c++) M[r][c] -= factor * M[col][c];
    }
  }
  return M.map((row, i) => row[n] / (row[i] || 1e-9));
}

/** Polynomial least-squares fit. x should be pre-scaled to a small range. */
export function polyFit(points: Point2[], degree: number): number[] {
  const m = degree + 1;
  const A: number[][] = Array.from({ length: m }, () => new Array(m).fill(0));
  const yv = new Array(m).fill(0);
  for (const p of points) {
    const powers = [1];
    for (let d = 1; d < 2 * m; d++) powers.push(powers[d - 1] * p.x);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) A[i][j] += powers[i + j];
      yv[i] += powers[i] * p.y;
    }
  }
  // tiny ridge term keeps high-degree fits numerically stable
  for (let i = 0; i < m; i++) A[i][i] += 1e-6;
  return solveLinearSystem(A, yv);
}

export function polyEval(coefs: number[], x: number): number {
  let v = 0;
  let xp = 1;
  for (const c of coefs) {
    v += c * xp;
    xp *= x;
  }
  return v;
}

/** k-means state and stepping (assign / update as separate phases). */
export type KMeansState = {
  centroids: Point2[];
  assignments: number[]; // -1 = unassigned
  phase: "assign" | "update";
  iteration: number;
  moved: number;
};

export function kmeansInit(k: number, seedCentroids: Point2[]): KMeansState {
  return {
    centroids: seedCentroids.slice(0, k).map((c) => ({ ...c })),
    assignments: [],
    phase: "assign",
    iteration: 0,
    moved: Infinity,
  };
}

export function kmeansStep(points: Point2[], state: KMeansState): KMeansState {
  if (state.phase === "assign") {
    const assignments = points.map((p) => {
      let best = 0;
      let bestD = Infinity;
      state.centroids.forEach((c, i) => {
        const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    });
    return { ...state, assignments, phase: "update" };
  }
  let moved = 0;
  const centroids = state.centroids.map((c, i) => {
    const members = points.filter((_, idx) => state.assignments[idx] === i);
    if (members.length === 0) return c;
    const nx = members.reduce((s, p) => s + p.x, 0) / members.length;
    const ny = members.reduce((s, p) => s + p.y, 0) / members.length;
    moved += Math.hypot(nx - c.x, ny - c.y);
    return { x: nx, y: ny };
  });
  return {
    ...state,
    centroids,
    phase: "assign",
    iteration: state.iteration + 1,
    moved,
  };
}

export function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

/** Logistic regression via gradient descent on 2 standardized features. */
export function trainLogistic(
  data: { x: number; y: number; label: number }[],
  epochs = 400,
  lr = 0.3
): { w1: number; w2: number; b: number } {
  let w1 = 0;
  let w2 = 0;
  let b = 0;
  const n = data.length;
  for (let e = 0; e < epochs; e++) {
    let d1 = 0;
    let d2 = 0;
    let db = 0;
    for (const p of data) {
      const pred = sigmoid(w1 * p.x + w2 * p.y + b);
      const err = pred - p.label;
      d1 += err * p.x;
      d2 += err * p.y;
      db += err;
    }
    w1 -= (lr * d1) / n;
    w2 -= (lr * d2) / n;
    b -= (lr * db) / n;
  }
  return { w1, w2, b };
}

export function standardizeStats(values: number[]): {
  mean: number;
  std: number;
} {
  const mean = values.reduce((s, v) => s + v, 0) / (values.length || 1);
  const variance =
    values.reduce((s, v) => s + (v - mean) ** 2, 0) / (values.length || 1);
  return { mean, std: Math.sqrt(variance) || 1 };
}
