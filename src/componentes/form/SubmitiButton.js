import React from 'react';
import styles from './SubmitiButton.module.css'

function SubmitiButton({text}) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    );
}

export default SubmitiButton