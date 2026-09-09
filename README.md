# Monsters

A Three.js scene featuring two monsters with custom eye shaders.

[Live](https://dariaborisiak.com/monsters/)

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

Each eyeball is a mesh that turns to face a point near the camera, so how much light it catches is just how closely its forward direction lines up with the directional light. The closer it lines up, the smaller the pupil. Its size is one uniform, `uPupilOpenness`, written to the shader every frame and eased over about a second so it never snaps.

The eyes can't physically turn far enough to look straight at the light, so the narrow band of angles they *can* reach is stretched across the full range - otherwise the effect would be invisible.

The slider in the corner sets a single `brightness` value, and the ambient light, the directional light and the environment map are all derived from it. The pupils read the same value, so the darker it gets the wider they open - in total darkness they almost fill the iris.

The camera drifts a little with the cursor too, then re-aims at the same point so the monsters stay centred.

