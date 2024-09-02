// shared/Spinner.js
import React, { useState, useEffect } from "react";
import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
