import { FC } from "react";

import styles from './button.module.css';

type TButtonProps = {
  value: string;
}

const Button: FC<TButtonProps> = ({ value }) => {
  return (
    <button className={styles.button}>{value}</button>
  );
};

export default Button;