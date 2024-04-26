import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// Note: I've modularized this code. I've just compiled it all into a single file here.

const ATOMS =
{   'Hydrogen':
    {   atomicNum: 1,
        atomicMass: 1,
        electronConfig: '1s1',
        name: null,
        atomicSymbol: 'H',
    },
    'Helium':
    {   atomicNum: 2,
        atomicMass: 4,
        electronConfig: '1s2',
        name: null,
        atomicSymbol: 'He',
    },
    'Lithium':
    {   atomicNum: 3,
        atomicMass: 7,
        electronConfig: '1s2 2s1',
        name: null,
        atomicSymbol: 'Li',
    },
    'Beryllium':
    {   atomicNum: 4,
        atomicMass: 9,
        electronConfig: '1s2 2s2',
        name: null,
        atomicSymbol: 'Be',
    },
    'Boron':
    {   atomicNum: 5,
        atomicMass: 11,
        electronConfig: '1s2 2s2 2p1',
        name: null,
        atomicSymbol: 'B',
    },
    'Carbon':
    {   atomicNum: 6,
        atomicMass: 12,
        electronConfig: '1s2 2s2 2p2',
        name: null,
        atomicSymbol: 'C',
    },
    'Nitrogen':
    {   atomicNum: 7,
        atomicMass: 14,
        electronConfig: '1s2 2s2 2p3',
        name: null,
        atomicSymbol: 'N',
    },
    'Oxygen':
    {   atomicNum: 8,
        atomicMass: 16,
        electronConfig: '1s2 2s2 2p4',
        name: null,
        atomicSymbol: 'O',
    },
    'Fluorine':
    {   atomicNum: 9,
        atomicMass: 19,
        electronConfig: '1s2 2s2 2p5',
        name: null,
        atomicSymbol: 'F',
    },
    'Neon':
    {   atomicNum: 10,
        atomicMass: 20,
        electronConfig: '1s2 2s2 2p6',
        name: null,
        atomicSymbol: 'Ne',
    },
    'Sodium':
    {   atomicNum: 11,
        atomicMass: 23,
        electronConfig: '1s2 2s2 2p6 3s1',
        name: null,
        atomicSymbol: 'Na',
    },
    'Magnesium':
    {   atomicNum: 12,
        atomicMass: 24,
        electronConfig: '1s2 2s2 2p6 3s2',
        name: null,
        atomicSymbol: 'Mg',
    },
    'Aluminum':
    {   atomicNum: 13,
        atomicMass: 27,
        electronConfig: '1s2 2s2 2p6 3s2 3p1',
        name: null,
        atomicSymbol: 'Al',
    },
    'Silicon':
    {   atomicNum: 14,
        atomicMass: 28,
        electronConfig: '1s2 2s2 2p6 3s2 3p2',
        name: null,
        atomicSymbol: 'Si',
    },
    'Phosphorus':
    {   atomicNum: 15,
        atomicMass: 31,
        electronConfig: '1s2 2s2 2p6 3s2 3p3',
        name: null,
        atomicSymbol: 'P',
    },
    'Sulfur':
    {   atomicNum: 16,
        atomicMass: 32,
        electronConfig: '1s2 2s2 2p6 3s2 3p4',
        name: null,
        atomicSymbol: 'S',
    },
    'Chlorine':
    {   atomicNum: 17,
        atomicMass: 35,
        electronConfig: '1s2 2s2 2p6 3s2 3p5',
        name: null,
        atomicSymbol: 'Cl',
    },
    'Argon':
    {   atomicNum: 18,
        atomicMass: 40,
        electronConfig: '1s2 2s2 2p6 3s2 3p6',
        name: null,
        atomicSymbol: 'Ar',
    },
    'Potassium':
    {   atomicNum: 19,
        atomicMass: 39,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s1',
        name: null,
        atomicSymbol: 'K',
    },
    'Calcium':
    {   atomicNum: 20,
        atomicMass: 40,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2',
        name: null,
        atomicSymbol: 'Ca',
    },
    'Scandium':
    {   atomicNum: 21,
        atomicMass: 45,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d1',
        name: null,
        atomicSymbol: 'Sc',
    },
    'Titanium':
    {   atomicNum: 22,
        atomicMass: 48,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d2',
        name: null,
        atomicSymbol: 'Ti',
    },
    'Vanadium':
    {   atomicNum: 23,
        atomicMass: 51,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d3',
        name: null,
        atomicSymbol: 'V',
    },
    'Chromium':
    {   atomicNum: 24,
        atomicMass: 52,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s1 3d5',
        name: null,
        atomicSymbol: 'Cr',
    },
    'Manganese':
    {   atomicNum: 25,
        atomicMass: 55,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d5',
        name: null,
        atomicSymbol: 'Mn',
    },
    'Iron':
    {   atomicNum: 26,
        atomicMass: 56,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d6',
        name: null,
        atomicSymbol: 'Fe',
    },
    'Cobalt':
    {   atomicNum: 27,
        atomicMass: 59,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d7',
        name: null,
        atomicSymbol: 'Co',
    },
    'Nickel':
    {   atomicNum: 28,
        atomicMass: 59,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d8',
        name: null,
        atomicSymbol: 'Ni',
    },
    'Copper':
    {   atomicNum: 29,
        atomicMass: 64,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s1 3d10',
        name: null,
        atomicSymbol: 'Cu',
    },
    'Zinc':
    {   atomicNum: 30,
        atomicMass: 65,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10',
        name: null,
        atomicSymbol: 'Zn',
    },
    'Gallium':
    {   atomicNum: 31,
        atomicMass: 70,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1',
        name: null,
        atomicSymbol: 'Ga',
    },
    'Germanium':
    {   atomicNum: 32,
        atomicMass: 73,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p2',
        name: null,
        atomicSymbol: 'Ge',
    },
    'Arsenic':
    {   atomicNum: 33,
        atomicMass: 75,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p3',
        name: null,
        atomicSymbol: 'As',
    },
    'Selenium':
    {   atomicNum: 34,
        atomicMass: 79,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p4',
        name: null,
        atomicSymbol: 'Se',
    },
    'Bromine':
    {   atomicNum: 35,
        atomicMass: 80,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p5',
        name: null,
        atomicSymbol: 'Br',
    },
    'Krypton':
    {   atomicNum: 36,
        atomicMass: 84,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6',
        name: null,
        atomicSymbol: 'Kr',
    },
    'Rubidium':
    {   atomicNum: 37,
        atomicMass: 85,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1',
        name: null,
        atomicSymbol: 'Rb',
    },
    'Strontium':
    {   atomicNum: 38,
        atomicMass: 88,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2',
        name: null,
        atomicSymbol: 'Sr',
    },
    'Yttrium':
    {   atomicNum: 39,
        atomicMass: 89,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d1',
        name: null,
        atomicSymbol: 'Y',
    },
    'Zirconium':
    {   atomicNum: 40,
        atomicMass: 91,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d2',
        name: null,
        atomicSymbol: 'Zr',
    },
    'Niobium':
    {   atomicNum: 41,
        atomicMass: 93,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d3',
        name: null,
        atomicSymbol: 'Nb',
    },
    'Molybdenum':
    {   atomicNum: 42,
        atomicMass: 96,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d5',
        name: null,
        atomicSymbol: 'Mo',
    },
    'Technetium':
    {   atomicNum: 43,
        atomicMass: 98,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d5',
        name: null,
        atomicSymbol: 'Tc',
    },
    'Ruthenium':
    {   atomicNum: 44,
        atomicMass: 101,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d6',
        name: null,
        atomicSymbol: 'Ru',
    },
    'Rhodium':
    {   atomicNum: 45,
        atomicMass: 103,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d7',
        name: null,
        atomicSymbol: 'Rh',
    },
    'Palladium':
    {   atomicNum: 46,
        atomicMass: 106,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d8',
        name: null,
        atomicSymbol: 'Pd',
    },
    'Silver':
    {   atomicNum: 47,
        atomicMass: 108,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d10',
        name: null,
        atomicSymbol: 'Ag',
    },
    'Cadmium':
    {   atomicNum: 48,
        atomicMass: 112,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10',
        name: null,
        atomicSymbol: 'Cd',
    },
    'Indium':
    {   atomicNum: 49,
        atomicMass: 115,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p1',
        name: null,
        atomicSymbol: 'In',
    },
    'Tin':
    {   atomicNum: 50,
        atomicMass: 119,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p2',
        name: null,
        atomicSymbol: 'Sn',
    },
    'Antimony':
    {   atomicNum: 51,
        atomicMass: 122,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p3',
        name: null,
        atomicSymbol: 'Sb',
    },
    'Tellurium':
    {   atomicNum: 52,
        atomicMass: 128,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p4',
        name: null,
        atomicSymbol: 'Te',
    },
    'Iodine':
    {   atomicNum: 53,
        atomicMass: 127,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p5',
        name: null,
        atomicSymbol: 'I',
    },
    'Xenon':
    {   atomicNum: 54,
        atomicMass: 131,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6',
        name: null,
        atomicSymbol: 'Xe',
    },
    'Cesium': // no
    {   atomicNum: 55,
        atomicMass: 133,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1',
        name: null,
        atomicSymbol: 'Cs',
    },
    'Barium':
    {   atomicNum: 56,
        atomicMass: 137,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2',
        name: null,
        atomicSymbol: 'Ba',
    },
    'Lanthanum': // i hate you i hate you i hate you i hate you
    {   atomicNum: 57,
        atomicMass: 139,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f0 5d1',
        name: null,
        atomicSymbol: 'La',
    },
    'Cerium':
    {   atomicNum: 58,
        atomicMass: 140,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f1 5d1',
        name: null,
        atomicSymbol: 'Ce',
    },
    'Praseodymium':
    {   atomicNum: 59,
        atomicMass: 141,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f3',
        name: null,
        atomicSymbol: 'Pr',
    },
    'Neodymium':
    {   atomicNum: 60,
        atomicMass: 144,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f4',
        name: null,
        atomicSymbol: 'Nd',
    },
    'Promethium':
    {   atomicNum: 61,
        atomicMass: 145,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f5',
        name: null,
        atomicSymbol: 'Pm',
    },
    'Samarium':
    {   atomicNum: 62,
        atomicMass: 150,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f6',
        name: null,
        atomicSymbol: 'Sm',
    },
    'Europium':
    {   atomicNum: 63,
        atomicMass: 152,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7',
        name: null,
        atomicSymbol: 'Eu',
    },
    'Gadolinium':
    {   atomicNum: 64,
        atomicMass: 157,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7 5d1',
        name: null,
        atomicSymbol: 'Gd',
    },
    'Terbium':
    {   atomicNum: 65,
        atomicMass: 159,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f9',
        name: null,
        atomicSymbol: 'Tb',
    },
    'Dysprosium':
    {   atomicNum: 66,
        atomicMass: 163,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f10',
        name: null,
        atomicSymbol: 'Dy',
    },
    'Holmium':
    {   atomicNum: 67,
        atomicMass: 165,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f11',
        name: null,
        atomicSymbol: 'Ho',
    },
    'Erbium':
    {   atomicNum: 68,
        atomicMass: 167,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f12',
        name: null,
        atomicSymbol: 'Er',
    },
    'Thulium':
    {   atomicNum: 69,
        atomicMass: 169,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f13',
        name: null,
        atomicSymbol: 'Tm',
    },
    'Ytterbium':
    {   atomicNum: 70,
        atomicMass: 173,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14',
        name: null,
        atomicSymbol: 'Yb',
    },
    'Lutetium':
    {   atomicNum: 71,
        atomicMass: 175,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d1',
        name: null,
        atomicSymbol: 'Lu',
    },
    'Hafnium':
    {   atomicNum: 72,
        atomicMass: 179,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d2',
        name: null,
        atomicSymbol: 'Hf',
    },
    'Tantalum':
    {   atomicNum: 73,
        atomicMass: 181,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d3',
        name: null,
        atomicSymbol: 'Ta',
    },
    'Tungsten':
    {   atomicNum: 74,
        atomicMass: 184,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d4',
        name: null,
        atomicSymbol: 'W',
    },
    'Rhenium':
    {   atomicNum: 75,
        atomicMass: 186,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d5',
        name: null,
        atomicSymbol: 'Re',
    },
    'Osmium':
    {   atomicNum: 76,
        atomicMass: 190,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d6',
        name: null,
        atomicSymbol: 'Os',
    },
    'Iridium':
    {   atomicNum: 77,
        atomicMass: 192,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d7',
        name: null,
        atomicSymbol: 'Ir',
    },
    'Platinum':
    {   atomicNum: 78,
        atomicMass: 195,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d8',
        name: null,
        atomicSymbol: 'Pt',
    },
    'Gold':
    {   atomicNum: 79,
        atomicMass: 197,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d10',
        name: null,
        atomicSymbol: 'Au',
    },
    'Mercury':
    {   atomicNum: 80,
        atomicMass: 201,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10',
        name: null,
        atomicSymbol: 'Hg',
    },
    'Thallium':
    {   atomicNum: 81,
        atomicMass: 204,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p1',
        name: null,
        atomicSymbol: 'Tl',
    },
    'Lead':
    {   atomicNum: 82,
        atomicMass: 207,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p2',
        name: null,
        atomicSymbol: 'Pb',
    },
    'Bismuth':
    {   atomicNum: 83,
        atomicMass: 209,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p3',
        name: null,
        atomicSymbol: 'Bi',
    },
    'Polonium':
    {   atomicNum: 84,
        atomicMass: 209,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p4',
        name: null,
        atomicSymbol: 'Po',
    },
    'Astatine':
    {   atomicNum: 85,
        atomicMass: 210,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p5',
        name: null,
        atomicSymbol: 'At',
    },
    'Radon':
    {   atomicNum: 86,
        atomicMass: 222,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6',
        name: null,
        atomicSymbol: 'Rn',
    },
    'Francium':
    {   atomicNum: 87,
        atomicMass: 223,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s1',
        name: null,
        atomicSymbol: 'Fr',
    },
    'Radium':
    {   atomicNum: 88,
        atomicMass: 226,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2',
        name: null,
        atomicSymbol: 'Ra',
    },
    'Actinium':
    {   atomicNum: 89,
        atomicMass: 227,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f0 6d1',
        name: null,
        atomicSymbol: 'Ac',
    },
    'Thorium':
    {   atomicNum: 90,
        atomicMass: 232,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f0 6d2',
        name: null,
        atomicSymbol: 'Th',
    },
    'Protactinium':
    {   atomicNum: 91,
        atomicMass: 231,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f2 6d1',
        name: null,
        atomicSymbol: 'Pa',
    },
    'Uranium':
    {   atomicNum: 92,
        atomicMass: 238,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1',
        name: null,
        atomicSymbol: 'U',
    },
    'Neptunium':
    {   atomicNum: 93,
        atomicMass: 237,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f4 6d1',
        name: null,
        atomicSymbol: 'Np',
    },
    'Plutonium':
    {   atomicNum: 94,
        atomicMass: 244,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f6',
        name: null,
        atomicSymbol: 'Pu',
    },
    'Americium':
    {   atomicNum: 95,
        atomicMass: 243,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7',
        name: null,
        atomicSymbol: 'Am',
    },
    'Curium':
    {   atomicNum: 96,
        atomicMass: 247,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7 6d1',
        name: null,
        atomicSymbol: 'Cm',
    },
    'Berkelium':
    {   atomicNum: 97,
        atomicMass: 247,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f9',
        name: null,
        atomicSymbol: 'Bk',
    },
    'Californium':
    {   atomicNum: 98,
        atomicMass: 251,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f10',
        name: null,
        atomicSymbol: 'Cf',
    },
    'Einsteinium':
    {   atomicNum: 99,
        atomicMass: 252,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f11',
        name: null,
        atomicSymbol: 'Es',
    },
    'Fermium':
    {   atomicNum: 100,
        atomicMass: 257,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f12',
        name: null,
        atomicSymbol: 'Fm',
    },
    'Mendelevium':
    {   atomicNum: 101,
        atomicMass: 258,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f13',
        name: null,
        atomicSymbol: 'Md',
    },
    'Nobelium':
    {   atomicNum: 102,
        atomicMass: 259,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14',
        name: null,
        atomicSymbol: 'No',
    },
    'Lawrencium':
    {   atomicNum: 103,
        atomicMass: 262,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d0 7p1',
        name: null,
        atomicSymbol: 'Lr',
    },
    'Rutherfordium':
    {   atomicNum: 104,
        atomicMass: 267,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d2',
        name: null,
        atomicSymbol: 'Rf',
    },
    'Dubnium':
    {   atomicNum: 105,
        atomicMass: 262,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d3',
        name: null,
        atomicSymbol: 'Db',
    },
    'Seaborgium':
    {   atomicNum: 106,
        atomicMass: 269,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d4',
        name: null,
        atomicSymbol: 'Sg',
    },
    'Bohrium':
    {   atomicNum: 107,
        atomicMass: 264,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d5',
        name: null,
        atomicSymbol: 'Bh',
    },
    'Hassium':
    {   atomicNum: 108,
        atomicMass: 269,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d6',
        name: null,
        atomicSymbol: 'Hs',
    },
    'Meitnerium':
    {   atomicNum: 109,
        atomicMass: 278,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d7',
        name: null,
        atomicSymbol: 'Mt',
    },
    'Darmstadtium':
    {   atomicNum: 110,
        atomicMass: 281,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d8',
        name: null,
        atomicSymbol: 'Ds',
    },
    'Roentgenium':
    {   atomicNum: 111,
        atomicMass: 282,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d9',
        name: null,
        atomicSymbol: 'Rg',
    },
    'Copernicium':
    {   atomicNum: 112,
        atomicMass: 285,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10',
        name: null,
        atomicSymbol: 'Cn',
    },
    'Nihonium':
    {   atomicNum: 113,
        atomicMass: 286,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p1',
        name: null,
        atomicSymbol: 'Nh',
    },
    'Flerovium':
    {   atomicNum: 114,
        atomicMass: 289,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p2',
        name: null,
        atomicSymbol: 'Fl',
    },
    'Moscovium':
    {   atomicNum: 115,
        atomicMass: 289,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p3',
        name: null,
        atomicSymbol: 'Mc',
    },
    'Livermorium':
    {   atomicNum: 116,
        atomicMass: 293,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p4',
        name: null,
        atomicSymbol: 'Lv',
    },
    'Tennessine':
    {   atomicNum: 117,
        atomicMass: 294,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p5',
        name: null,
        atomicSymbol: 'Ts',
    },
    'Oganesson':
    {   atomicNum: 118,
        atomicMass: 294,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6',
        name: null,
        atomicSymbol: 'Og',
    }
}

for (let element in ATOMS)
{   ATOMS[element].name = element;   }

class Proton
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 1, 32, 32 ),
            new THREE.MeshPhongMaterial
            (   {   color: 0xff0000,
                    side: THREE.DoubleSide,
                    shininess: 3,
                    specular: 0xffffff,
                    name: 'protonMesh',
                    opacity: 0.8,
                    transparent: true
                }
            )
        );
        this.name = 'Proton';
        this.body = new CANNON.Body
        (   {   mass: 1,
                shape: new CANNON.Sphere( 1 ),
                position: new CANNON.Vec3( Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5 ),
                name: 'protonBody',
                linearDamping: 0.99,
                angularDamping: 0.99
		    }
        );
    }
}

class Neutron
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 1, 32, 32 ),
            new THREE.MeshPhongMaterial
            (   {   color:  0x0000ff,
                    side: THREE.DoubleSide,
                    shininess: 3,
                    specular: 0xffffff,
                    name: 'neutronMesh',
                    opacity: 0.8,
                    transparent: true
                }
            ),
        );
        this.name = 'Neutron';
        this.body = new CANNON.Body
        (   {   mass: 1,
                shape: new CANNON.Sphere( 1 ),
                position: new CANNON.Vec3( Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5 ),
                name: 'neutronBody',
                linearDamping: 0.99,
                angularDamping: 0.99
		    }
        );
    }
}

class Electron
{   constructor( color = 0x37ff37, orbital )
    {   this.color = color;
        this.name = `Electron ${orbital}`;
        this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 0.4, 32, 32 ),
            new THREE.MeshBasicMaterial
            (   {   color: this.color,
                    opacity: 0.7,
                    transparent: true
                }
            )
        )
    }
}

class ElectronShell
{   constructor( radius = 12 )
    {   this.radius = radius;
        this.name = `Electron Shell ${((this.radius - 12) / 5) + 1 }`;
        this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry( this.radius, 0.05 ),
            new THREE.MeshBasicMaterial(),
        );
        this.mesh.rotation.set( Math.PI / 2, 0, 0 );
    }
}

class Atom
{   constructor( name, atomicNum, atomicMass, atomicSymbol, electronConfigurationExtended, rotateEnabled = true, colorsEnabled = true)
    {   this.colorsEnabled = colorsEnabled;
        this.colorsExtended = Object.entries
        (   {   _1s: 0x37ff30,
                _2s: 0xff3037,
                _2p: 0xff3037,
                _3s: 0x3037ff,
                _3p: 0x3037ff,
                _4s: 0xff9030,
                _3d: 0x3037ff,
                _4p: 0xff9030,
                _5s: 0xf830ff,
                _4d: 0xff9030,
                _5p: 0xf830ff,
                _6s: 0x30fff8,
                _4f: 0xff9030,
                _5d: 0xf830ff,
                _6p: 0x30fff8,
                _7s: 0xffffff,
                _5f: 0xf830ff,
                _6d: 0x30fff8,
                _7p: 0xffffff
            }
        );
        this.colorsBasic = Object.entries
        (   {   _1: 0x37ff30,
                _2: 0xff3037,
                _3: 0x3037ff,
                _4: 0xff9030,
                _5: 0xf830ff,
                _6: 0x30fff8,
                _7: 0xffffff,
            }
        );
        this.name = name;
        this.atomicNum = atomicNum;
        this.atomicMass = atomicMass;
        this.atomicSymbol = atomicSymbol;
        this.electronConfigurationExtended = electronConfigurationExtended; // Ex: '1s2 2s2 2p4'
        this.nucleons = this.initNucleus();
        this.electronData = this.initElectrons();
        this.electrons = this.electronData[0];
        this.orbitals = this.electronData[1];
        this.bohrElectronShells = this.initBohrShells();
        this.rotateEnabled = rotateEnabled;
    }

    initNucleus()
    {   let nucleons = [];
        for ( let i = 0; i < this.atomicMass; i++ )
        {   if ( i < this.atomicMass - this.atomicNum )
            {   nucleons.push( new Neutron() );   }
            else
            {   nucleons.push( new Proton() );   }
        }

        return nucleons;
    }

    // The BohrAtomManager will actually add these shells to the scene. In the QuantumAtomManager, the radius of the shells are merely used as a reference for the camera/controls distance.
    initBohrShells()
    {   let electronShells = [];
        for (let i = 0; i < this.electrons.length; i++)
        {   electronShells.push( new ElectronShell( 12 + (i * 5) ) );   }
        return electronShells;
    }

     // This code is atrocious and I'm sorry
    initElectrons()
    {   const orbitals = this.electronConfigurationExtended.split(' ');
        let electronShellData = [];

        for ( let i = 0; i < orbitals.length; i++ )
        {   const orbital = orbitals[i];
            const [ shell, count ] = orbital.match(/\d+/g);
            const electronCount = parseInt( count );

            if ( electronShellData[shell] )
            {   for ( let j = 0; j < electronCount; j++ )
                {   if ( this.colorsEnabled )
                    {   electronShellData[ shell ].push(new Electron(this.colorsExtended[i][1], `${orbital.substring(0, 2)}` ) );   }
                    else
                    {   electronShellData[ shell ].push(new Electron( 0x37ff37, `${orbital.substring(0, 2)}` ) );   }
                }
            } else {
                electronShellData[shell] = [];
                for ( let j = 0; j < electronCount; j++ )
                {   if ( this.colorsEnabled )
                    {   electronShellData[ shell ].push(new Electron(this.colorsExtended[i][1], `${orbital.substring(0, 2)}` ) );   }
                    else
                    {   electronShellData[ shell ].push(new Electron( 0x37ff37, `${orbital.substring(0, 2)}` ) );   }
                }
            }
        }

        return [electronShellData.slice(1), orbitals];
    }
}

/*
    - Adds nucleons, electrons, and electron shells to the nucleus when respective methods are called in the App init method
    - Handles the quaternion and position copying in the animation loop
    - Handles the physics for the nucleons in the animation loop
*/
class AbstractAtomManager
{   constructor( atom )
    {   this.atom = atom;
        this.minVelocitySquared = 0.1;
        this.minAngularVelocitySquared = 0.1;
        this.frameCount = 0;
        this.allBodiesStatic = false;
    }

    // Initialization function
    createElectrons( scene )
    {   throw new Error('createElectrons is not defined in the base class');   }

    // Animation function
    controlElectronMovement()
    {   throw new Error('controlElectronMovement is not defined in the base class');   }

    // Animation function
    controlElectronColoration()
    {   throw new Error('controlElectronColoration is not defined in the base class');   }

    // Initiation function
    createNucleus( scene, world )
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   scene.add( this.atom.nucleons[i].mesh );
            world.addBody( this.atom.nucleons[i].body );
        }
    }

    // Animation function
    controlNucleonMovement()
    {   this.frameCount++; // Because for some odd reason it takes a few frames for the nucleons to move

        // Bring protons and neutrons to the origin
        for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   this.atom.nucleons[i].body.force.set
            (   -this.atom.nucleons[i].body.position.x * 100,
                -this.atom.nucleons[i].body.position.y * 100,
                -this.atom.nucleons[i].body.position.z * 100,
            )

            // Stop moving the nucleus model if their movement is below a threshold
            if (this.frameCount > 60)
            {   if (this.atom.nucleons[i].body.velocity.lengthSquared() < this.minVelocitySquared || this.atom.nucleons[i].body.angularVelocity.lengthSquared() < this.minAngularVelocitySquared)
                {   this.atom.nucleons[i].body.type = CANNON.Body.STATIC;   }
            }

            this.atom.nucleons[i].mesh.position.copy( this.atom.nucleons[i].body.position );
            this.atom.nucleons[i].mesh.quaternion.copy( this.atom.nucleons[i].body.quaternion );
        }

        // Enable boolean in order to remove the loading screen
        if ( this.atom.nucleons.every( (nucleon) => nucleon.body.type == CANNON.Body.STATIC ) )
        {   this.allBodiesStatic = true;   }
    }

    resetAtom( scene, world, atom = null)
    {   for (let i = 0; i < this.atom.bohrElectronShells.length; i++)
        {   scene.remove(this.atom.bohrElectronShells[i].mesh);   }

        for (let i = 0; i < this.atom.electrons.length; i++)
        {   for (let j = 0; j < this.atom.electrons[i].length; j++)
            {   scene.remove(this.atom.electrons[i][j].mesh);   }
        }

        for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   scene.remove( this.atom.nucleons[i].mesh );
            world.removeBody( this.atom.nucleons[i].body );
        }

        if (atom)
        {   this.atom = atom;
            // Reset framerate and enable loading screen
            this.frameCount = 0;
            this.allBodiesStatic = false;

            this.createNucleus( scene, world );
            this.createElectrons( scene );
        }
    }
}

/*
    - Concrete manager for wave mechanical atomic model
*/
// class QuantumAtomManager extends AbstractAtomManager
// {   // Initiation Function
//     createElectrons( scene )
//     {

//     }

//     // Animation function
//     controlElectronMovement()
//     {

//     }

//     controlElectronColoration()
//     {

//     }
// }

/*
    - Concrete manager for Bohr atomic model
*/
class BohrAtomManager extends AbstractAtomManager
{   // Initiation function
    createElectrons( scene )
    {   for (let i = 0; i < this.atom.bohrElectronShells.length; i++)
        {   scene.add( this.atom.bohrElectronShells[i].mesh );   }

        /* Iterate through multi-dimensional electron array and add them to the scene while setting their positions
           - The angle (in radians) is obtained by dividing the iterator by the length of the shell and multiplying it by the angle of a circle.
             By doing this, the electrons will be evenly distributed on each shell.
            - Ex: Nitrogen has 5 electrons in the second shell. The first electron is 1. 1/5 = 0.2, multiplied by 2PI is 0.4PI, the angle the electron will be positioned.
                  The second electron is 2. 2/5 = 0.4, multiplied by 2PI is 0.8PI, and so on
           - The x-coordinate is determined by taking the cosine of the radius of the shell multiplied by the adjusted angle ( to be more aesthetically pleasing )
              The z-coordinate ( technically the y-coordinate because the function plots electrons on a 2D plane) is determined in the same way but with using the sine function.
            - For each iteration of i (each shell), the electrons in that shell gets plotted on the circumference of the circle (the circle radius being determined by the i)
             - So, for the first shell, the radius will be 12 (i = 0). In the second shell, the radius is 17 (i = 0). And so on.
        */
        for ( let i = 0; i < this.atom.electrons.length; i++ )
        {   for ( let j = 0; j < this.atom.electrons[i].length; j++ )
            {   scene.add( this.atom.electrons[i][j].mesh );
                let angle = ( j / this.atom.electrons[i].length ) * Math.PI * 2;
                let orbitX = Math.cos( 0.5 + angle ) * ( 12 + ( i * 5 ));
                let orbitZ = Math.sin( 0.5 + angle ) * ( 12 + ( i * 5 ));
                this.atom.electrons[i][j].mesh.position.set( orbitX, 0, orbitZ );
            }
        }
    }

    // Animation function
    controlElectronColoration( intersectedObj )
    {   /* This function takes in the intersected object ( which would be an electron but really I'm just too lazy to filter out the rest of the meshes. It makes a minimal effect on performance anyways)
           The reason this is done is to prevent the color of a electrons to immediately change back colors when hovered upon.
           Is it necessary? Maybe not. But I'm not smart enough to figure out a better solution
        */
        if ( this.atom.colorsEnabled )
        {   for (let i = 0; i < this.atom.electrons.length; i++)
            {   for (let j = 0; j < this.atom.electrons[i].length; j++)
                {   if (this.atom.electrons[i][j].mesh != intersectedObj)
                    {   this.atom.electrons[i][j].mesh.material.color.set( this.atom.colorsBasic[i][1] );   }
                }
            }
        }
        else
        {   for (let i = 0; i < this.atom.electrons.length; i++)
            {   for (let j = 0; j < this.atom.electrons[i].length; j++)
                {   if (this.atom.electrons[i][j].mesh != intersectedObj)
                    {   this.atom.electrons[i][j].mesh.material.color.set( 0x37ff37 );   }
                }
            }
        }
    }

    // Animation function
    controlElectronMovement() // This is essentially the same code used when creating electrons except that time is used as well ( to repeatedly reposition the electrons in each animation call)
    {   if ( this.atom.rotateEnabled )
        {   let time = Date.now() * 0.001;
            for (let i = 0; i < this.atom.electrons.length; i++)
            {   for (let j = 0; j < this.atom.electrons[i].length; j++)
                {   let angle = (j / this.atom.electrons[i].length) * Math.PI * 2;
                    let orbitX = Math.cos(time * 0.5 + angle) * (12 + (i * 5));
                    let orbitZ = Math.sin(time * 0.5 + angle) * (12 + (i * 5));
                    this.atom.electrons[i][j].mesh.material.color.set( this.atom.colorsBasic[i][1] );
                    this.atom.electrons[i][j].mesh.position.set( orbitX, 0, orbitZ );
                }
            }
        }
    }
}

let triviaText = document.getElementById('triviaText');
let triviaPool = ['Iron is the most abundant metal in the universe!', 'Nonmetals in the third period and below can have an expanded octet!', 'Bismuth has the longest half-life of any radioactive element!', 'Manganese has 7 oxidation states!', 'Lead is the heaviest stable element!', "Hydrogen with a single neutron is called Deuterium!", 'In reality, over 99.9% of an atom is empty space!', 'Fluorine is the most electronegative atom!', "Francium has the largest atomic radius of any element!", 'The most recently discovered atom is Tennessine!'];
triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length ) ];

let atomDiv = document.createElement( 'div' );
let atomNumDiv = document.createElement( 'div' );
let atomMassDiv = document.createElement( 'div' );
let labels = [ atomDiv, atomNumDiv, atomMassDiv ];

for (let i = 0; i < labels.length; i++)
{   labels[i].classList.add('label');
    labels[i].classList.add('noDisplay');
    if ( i > 0 )
    {   labels[i].style.fontSize = '18px';   }
}

class App
{   constructor( manager )
    {   this.scene = new THREE.Scene();
        this.root = new THREE.Group();
        this.world = new CANNON.World( 0, 0, 0 );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.labelRenderer = new CSS2DRenderer();
        this.camera = new THREE.PerspectiveCamera
        (   45, window.innerWidth / window.innerHeight, 1, 1000   );
        this.controls = new OrbitControls( this.camera, this.labelRenderer.domElement );
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.onWindowResize = this.onWindowResize.bind( this );
        this.animate = this.animate.bind( this );
        this.onPointerMove = this.onPointerMove.bind( this );
        this.manager = manager;
        this.intersectedObject;
        this.stats = new Stats();
        this.labelsEnabled = true;
    }

    onPointerMove( event )
    {   this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.pointer, this.camera );
        let intersects = this.raycaster.intersectObject(this.scene, true);

        // Highlights intersected objects

        if ( this.intersectedObject ) { // Check if value of intersectedObject is not null
            this.intersectedObject.material = this.intersectedObject.originalMaterial;
            this.intersectedObject = null;
        }

        if ( intersects.length > 0 )
        {   let intersectedObject = intersects[0].object;
            intersectedObject.originalMaterial = intersectedObject.material.clone();
            intersectedObject.material = new THREE.MeshBasicMaterial
            (   {   opacity: 0.7,
                    transparent: true,
                    color: 0xffffff
                }
            );
            this.intersectedObject = intersectedObject;
        }
    }

    onWindowResize()
    {   this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight );
    }

    animate()
    {   requestAnimationFrame( this.animate );
        this.stats.begin();
        if (this.manager.allBodiesStatic == true) // Display loading screen if the model is not static
        {   document.querySelector('#loadingScreen').style.display = 'none';
            for (let i = 0; i < labels.length; i++)
            {   labels[i].classList.remove('noDisplay');   }
        }
        else
        {   document.querySelector('#loadingScreen').style.display = 'flex';
            for (let i = 0; i < labels.length; i++)
            {   labels[i].classList.add('noDisplay');   }
        }
        this.renderer.render( this.scene, this.camera );
        this.labelRenderer.render( this.scene, this.camera );
        this.manager.controlElectronMovement();
        this.manager.controlNucleonMovement();
        this.manager.controlElectronColoration( this.intersectedObject );
        this.world.step( 1 / 60 );
        this.controls.update;
        this.stats.end();
    }

    initScene()
    {   this.camera.layers.enableAll();
        this.scene.add( this.root );

        this.camera.position.z = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 30;
        this.camera.position.y = 10;
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        atomDiv.textContent = `${this.manager.atom.name} (${this.manager.atom.atomicSymbol})`;
        atomNumDiv.textContent = `Atomic Number: ${this.manager.atom.atomicNum}`;
        atomMassDiv.textContent = `Isotope: ${this.manager.atom.atomicSymbol}-${this.manager.atom.atomicMass}`;

        let atomLabel = new CSS2DObject( atomDiv );
        let atomNumLabel = new CSS2DObject( atomNumDiv );
        let atomMassLabel = new CSS2DObject( atomMassDiv );

        atomLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + this.manager.atom.atomicNum / 20, 0 );
        atomNumLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 3, 0 );
        atomMassLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 6, 0 );

        this.root.add( atomLabel );
        this.root.add( atomNumLabel );
        this.root.add( atomMassLabel );

        atomLabel.layers.set( 1 );
        atomNumLabel.layers.set( 1 );
        atomMassLabel.layers.set( 1 );

        this.controls.minDistance = 15;
        this.controls.maxDistance = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 75;
        this.controls.enablePan = false;

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        let container = document.getElementById('canvas');
        document.body.appendChild( container );
        container.appendChild( this.renderer.domElement );
        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'pointermove', this.onPointerMove );

        this.labelRenderer.setSize(window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        document.body.appendChild( this.labelRenderer.domElement );

	    document.body.appendChild( this.stats.dom );

        const ambientLight = new THREE.AmbientLight( 0xffffff , 0.2 );
		this.root.add( ambientLight );

        const spotLight = new THREE.SpotLight( 0xffffff,  1500 );
        spotLight.position.set( 10, 25, 0 );
        spotLight.angle = Math.PI * Math.pow( 10, -1 );
        spotLight.penumbra = 1;
        spotLight.decay = 2;
	    spotLight.distance = 0;
        this.root.add( spotLight );

        // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // this.scene.add( spotLightHelper );

        this.scene.background = new THREE.Color( 0x111111 );

        // Temporary GUI
        let gui = new GUI();

        // Default selection for atom model on page load
        let selection =
        {   atom: 'Helium',
            rotate: true,
            basic: true,
            labels: true
        };

        let atomFolder = gui.addFolder('Atom');
        atomFolder.add( selection, 'atom');
        let rotateFolder = gui.addFolder('Rotate');
        rotateFolder.add( selection, 'rotate', [true, false] );
        atomFolder.open();
        let colorFolder = gui.addFolder('Colors');
        colorFolder.add( selection, 'basic', [true, false] );
        let labelFolder = gui.addFolder('Labels');
        labelFolder.add( selection, 'labels', [true, false] );

        atomFolder.onFinishChange
        (   ( target ) =>
            {   let targetValue = target.value.toLowerCase();
                let processedValue = targetValue.charAt(0).toUpperCase() + targetValue.slice(1);
                this.manager.resetAtom
                (   this.root,
                    this.world,
                    new Atom
                    (
                        ATOMS[processedValue].name, // Element Name
                        ATOMS[processedValue].atomicNum, // Atomic Number
                        ATOMS[processedValue].atomicMass, // Atomic Mass
                        ATOMS[processedValue].atomicSymbol, // Atomic Symbol
                        ATOMS[processedValue].electronConfig, // Electron Configuration
                        rotateFolder.controllers[0].object.rotate, // Rotate boolean
                        colorFolder.controllers[0].object.basic, // Colors boolean
                    )
                )

                this.camera.position.z = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 30;
                this.controls.maxDistance = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 75;
                this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

                atomDiv.textContent = `${this.manager.atom.name} (${this.manager.atom.atomicSymbol})`;
                atomNumDiv.textContent = `Atomic Number: ${this.manager.atom.atomicNum}`;
                atomMassDiv.textContent = `Isotope: ${this.manager.atom.atomicSymbol}-${this.manager.atom.atomicMass}`;

                atomLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + this.manager.atom.atomicNum / 20, 0 );
                atomNumLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 3, 0 );
                atomMassLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 6, 0 );

                triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length) ];
            }
        )

        rotateFolder.onChange
        (   ( target ) =>
            {   this.manager.atom.rotateEnabled = target.value;   }
        )

        colorFolder.onChange
        (   ( target ) =>
            {   this.manager.atom.colorsEnabled = target.value;   }
        )

        labelFolder.onChange
        (   ( target ) =>
            {   this.camera.layers.toggle( 1 );   }
        )

        this.manager.createNucleus( this.root, this.world );
        this.manager.createElectrons( this.root, this.world );

        this.animate();
    }
}

let manager = new BohrAtomManager( new Atom( 'Helium', 2, 4, 'He', '1s2 2s2', true, true ) );

let app = new App( manager );
app.initScene();