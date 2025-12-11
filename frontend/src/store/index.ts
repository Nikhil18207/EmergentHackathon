import { proxy } from 'valtio';

const state = proxy({
    color: '#ffffff',
    isLogoTexture: false,
    isFullTexture: false,
    logoDecal: './logo.png',
    fullDecal: './texture.png',
    modelPath: '/models/shirt_baked.glb', // Current 3D model file path
});

export default state;
