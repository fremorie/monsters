# Monsters

A Three.js scene featuring two monsters with custom eye shaders.

<img width="1713" height="917" alt="Screenshot from 2026-09-09 15-57-01" src="https://github.com/user-attachments/assets/31c7649c-0e17-46d9-b295-bfd171d94b23" />

# Run the project

```bush
nvm use
npm i
npm run dev
```

# References

Inspired by a video by Inigo Quilez: https://www.youtube.com/watch?v=emjuqqyq_qc

Eye model created with the help of Pau the Hueman's tutorial: https://www.youtube.com/watch?v=E2dcs3sxOZQ

# How it works

A concave sphere with the eye shader + another sphere made of [MeshTransmissionMaterial](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material) on top of it.

<img width="400" alt="Screenshot from 2026-09-09 16-35-11" src="https://github.com/user-attachments/assets/7b574efc-800b-4f08-8f52-c1377d9e5e79" />

