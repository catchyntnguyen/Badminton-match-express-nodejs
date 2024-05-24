function base() {
  const container_main = document.querySelector(".container__main");
  if (
    document.querySelector(".form_register") ||
    document.querySelector(".form_login")
  ) {
    document.querySelector(".form_register").onclick = () => {
      container_main.classList.add("translate-container");
    };
    document.querySelector(".form_login").onclick = () => {
      container_main.classList.remove("translate-container");
    };
  }
  function show_hiddenPassword() {
    // const inputPassword = document.querySelector('.input__password');
    const input_showPassword = document.querySelector(".input_show--password");
    // hidden - show password
    const hiddenShowPasswordButtons = document.querySelectorAll(
      ".show-hidden_password"
    );
    if (hiddenShowPasswordButtons) {
      hiddenShowPasswordButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const input_password = button
            .closest(".form__group")
            .querySelector(".form__input");
          input_password.type =
            input_password.type === "password" ? "text" : "password";
          button.querySelectorAll(".eye-icon").forEach((item) => {
            item.classList.toggle("eye-active");
          });
        });
      });
    }
  }
  show_hiddenPassword();
}
base();
