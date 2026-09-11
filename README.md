# Kamiseta
### **2D Apparel Mockup Generator**
**Version 0.1.0 (Alpha)**

Project: Kamiseta, is a quick 2D Apparel Mockup Generator for Graphic Designers working in Windows and Linux Distros. It is built with **Tauri v2** and **Vue.js**. It transforms designs for apparels (currently only Tshirt and Long Pants) into a quick 2D mockup.

---

## Features

* **2D Mockup:** Create a simple 2D mockup for designs of Tshirt and Long Pants.
* **Native Performance:** Powered by Tauri v2 for a tiny footprint and system-native speed.

## Current Limitations

As this is an early-stage project, please be aware of the following constraints:
* **Limited Apparel:** Currently only creates mockup for **Tshirt** and **Long Pants**.
* **One Time Transaction:** No saving functionality. Select mockup type, pick designs, then generate mockup.
* **Alpha Stage:** The app is still in early stage. Bugs might exist.

---

## Tech Stack

* **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API)
* **Desktop Framework:** [Tauri v2](https://v2.tauri.app/)

---

## Installation & Setup

### Prerequisites
* [Rust & Cargo](https://www.rust-lang.org/tools/install)
* [Node.js](https://nodejs.org/) (LTS recommended)
* System dependencies for Tauri (see [Tauri's Prerequisites](https://v2.tauri.app/start/prerequisites/))

### Development
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/designed-by-rdz/kamiseta.git](https://github.com/designed-by-rdz/kamiseta.git)
    cd kamiseta
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run in development mode:**
    ```bash
    npm run tauri dev
    ```

---

## Future Developments

This is a simple project for my graphic design mockups. At the moment, it satisfies my needs, although thinking ahead, future updates might come sooner or later, especially when the personal needs arise. As such, updates of this app mainly relies on my current needs as a graphic designer.

---

## Tentative Roadmap

- [ ] **More Mockup Types:** Create mockups for more apparel such as jerseys, shorts, longsleeve shirts, hoodies etc.
- [ ] **Better Mockup:** Implement a better and more fluid mockup generation.
- [ ] **3D Mockup** Implement a 3D mockup view aside from the 2D view.

## License
Distributed under the GPL-3.0 License. See `LICENSE` for more information.

---
*app designed by rdz*