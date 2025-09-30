import { insertDiv } from "/src/common/navBar/navBar.js";
import "/src/common/navBar/navBar.css";
import { insertDivFooter } from "/src/common/footer/footer.js";
import "/src/common/footer/footer.css";

export const addElements = () => {
  document.addEventListener("DOMContentLoaded", () => {
    insertDiv();
    insertDivFooter();
  });
};
