import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  index: string;
  title: string;
  desc?: ReactNode;
  children: ReactNode;
};

export default function Section({ id, index, title, desc, children }: Props) {
  return (
    <motion.section
      id={id}
      className="section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="section-head">
        <span className="section-index">{index}</span>
        <h2>{title}</h2>
      </div>
      {desc && <p className="section-desc">{desc}</p>}
      {children}
    </motion.section>
  );
}
