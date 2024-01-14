import { useEffect, useRef, useState } from "react";
import { CustomChar } from "../App";
import { SingleCharacter } from "./SingleCharacter";
import { motion, Variants } from "framer-motion";
import styles from "./AppTitle.module.css";

export function AppTitle() {
  const svgTitleRef = useRef<SVGSVGElement>(null);
  const [svgHeight, setSvhHeight] = useState(0);

  useEffect(() => {
    if (svgTitleRef.current) {
      const boundingBox = svgTitleRef.current.getBBox();
      const adjustedHeight = boundingBox.height + 20;
      setSvhHeight(adjustedHeight);
    }
  }, []);

  const charInitialPos = 10;
  const charWidth = 48;
  const textWidth = 420;
  const textOffset = 24;

  const title: CustomChar[] = [
    {
      char: "P",
      xPos: charInitialPos,
      yPos: svgHeight - textOffset,
      zIndex: 0,
    },
    {
      char: "o",
      xPos: charInitialPos + charWidth,
      yPos: svgHeight - textOffset,
      zIndex: 1,
    },
    {
      char: "K",
      xPos: charInitialPos + charWidth * 2,
      yPos: svgHeight - textOffset,
      zIndex: 0,
    },
    {
      char: "e",
      xPos: charInitialPos + charWidth * 3,
      yPos: svgHeight - textOffset,
      zIndex: 1,
    },
    {
      char: "M",
      xPos: charInitialPos + charWidth * 4,
      yPos: svgHeight - textOffset,
      zIndex: 0,
    },
    {
      char: "e",
      xPos: charInitialPos + charWidth * 5,
      yPos: svgHeight - textOffset,
      zIndex: 1,
    },
    {
      char: "M",
      xPos: charInitialPos + charWidth * 6,
      yPos: svgHeight - textOffset,
      zIndex: 0,
    },
    {
      char: "o",
      xPos: charInitialPos + charWidth * 7,
      yPos: svgHeight - textOffset,
      zIndex: 1,
    },
  ];

  const titleVariant: Variants = {
    initial: {
      opacity: 0,
      y: -25,
      rotateZ: -4,
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: 0.7,
        staggerChildren: 0.05,
        stiffness: 0.2,
        bounce: 1,
      },
    },
  };

  return (
    <motion.svg
      ref={svgTitleRef}
      initial="initial"
      animate="animate"
      variants={titleVariant}
      width={textWidth}
      height={svgHeight}
      className={styles.title}
    >
      {title
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((char, idx) => {
          return (
            <SingleCharacter
              key={idx}
              character={char}
              framerVariant={titleVariant}
            />
          );
        })}
    </motion.svg>
  );
}
