const ATOMS =
{   'Hydrogen':
    {   atomicNum: 1,
        atomicMass: 1,
        electronConfig: '1s1',
    },
    'Helium':
    {   atomicNum: 2,
        atomicMass: 4,
        electronConfig: '1s2',
    },
    'Lithium':
    {   atomicNum: 3,
        atomicMass: 7,
        electronConfig: '1s2 2s1',
    },
    'Beryllium':
    {   atomicNum: 4,
        atomicMass: 9,
        electronConfig: '1s2 2s2',
    },
    'Boron':
    {   atomicNum: 5,
        atomicMass: 11,
        electronConfig: '1s2 2s2 2p1'
    },
    'Carbon':
    {   atomicNum: 6,
        atomicMass: 12,
        electronConfig: '1s2 2s2 2p2',
    },
    'Nitrogen':
    {   atomicNum: 7,
        atomicMass: 14,
        electronConfig: '1s2 2s2 2p3',
    },
    'Oxygen':
    {   atomicNum: 8,
        atomicMass: 16,
        electronConfig: '1s2 2s2 2p4',
    },
    'Fluorine':
    {   atomicNum: 9,
        atomicMass: 19,
        electronConfig: '1s2 2s2 2p5',
    },
    'Neon':
    {   atomicNum: 10,
        atomicMass: 20,
        electronConfig: '1s2 2s2 2p6',
    },
    'Sodium':
    {   atomicNum: 11,
        atomicMass: 23,
        electronConfig: '1s2 2s2 2p6 3s1',
    },
    'Magnesium':
    {   atomicNum: 12,
        atomicMass: 24,
        electronConfig: '1s2 2s2 2p6 3s2',
    },
    'Aluminum':
    {   atomicNum: 13,
        atomicMass: 27,
        electronConfig: '1s2 2s2 2p6 3s2 3p1',
    },
    'Silicon':
    {   atomicNum: 14,
        atomicMass: 28,
        electronConfig: '1s2 2s2 2p6 3s2 3p2',
    },
    'Phosphorus':
    {   atomicNum: 15,
        atomicMass: 31,
        electronConfig: '1s2 2s2 2p6 3s2 3p3',
    },
    'Sulfur':
    {   atomicNum: 16,
        atomicMass: 32,
        electronConfig: '1s2 2s2 2p6 3s2 3p4',
    },
    'Chlorine':
    {   atomicNum: 17,
        atomicMass: 35,
        electronConfig: '1s2 2s2 2p6 3s2 3p5',
    },
    'Argon':
    {   atomicNum: 18,
        atomicMass: 40,
        electronConfig: '1s2 2s2 2p6 3s2 3p6',
    },
    'Potassium':
    {   atomicNum: 19,
        atomicMass: 39,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s1',
    },
    'Calcium':
    {   atomicNum: 20,
        atomicMass: 40,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2',
    },
    'Scandium':
    {   atomicNum: 21,
        atomicMass: 45,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d1',
    },
    'Titanium':
    {   atomicNum: 22,
        atomicMass: 48,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d2',
    },
    'Vanadium':
    {   atomicNum: 23,
        atomicMass: 51,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d3',
    },
    'Chromium':
    {   atomicNum: 24,
        atomicMass: 52,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s1 3d5',
    },
    'Manganese':
    {   atomicNum: 25,
        atomicMass: 55,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d5',
    },
    'Iron':
    {   atomicNum: 26,
        atomicMass: 56,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d6',
    },
    'Cobalt':
    {   atomicNum: 27,
        atomicMass: 59,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d7',
    },
    'Nickel':
    {   atomicNum: 28,
        atomicMass: 59,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d8',
    },
    'Copper':
    {   atomicNum: 29,
        atomicMass: 64,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s1 3d10',
    },
    'Zinc':
    {   atomicNum: 30,
        atomicMass: 65,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10',
    },
    'Gallium':
    {   atomicNum: 31,
        atomicMass: 70,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1',
    },
    'Germanium':
    {   atomicNum: 32,
        atomicMass: 73,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p2',
    },
    'Arsenic':
    {   atomicNum: 33,
        atomicMass: 75,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p3',
    },
    'Selenium':
    {   atomicNum: 34,
        atomicMass: 79,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p4',
    },
    'Bromine':
    {   atomicNum: 35,
        atomicMass: 80,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p5',
    },
    'Krypton':
    {   atomicNum: 36,
        atomicMass: 84,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6',
    },
    'Rubidium':
    {   atomicNum: 37,
        atomicMass: 85,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1',
    },
    'Strontium':
    {   atomicNum: 38,
        atomicMass: 88,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2',
    },
    'Yttrium':
    {   atomicNum: 39,
        atomicMass: 89,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d1',
    },
    'Zirconium':
    {   atomicNum: 40,
        atomicMass: 91,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d2',
    },
    'Niobium':
    {   atomicNum: 41,
        atomicMass: 93,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d3',
    },
    'Molybdenum':
    {   atomicNum: 42,
        atomicMass: 96,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d5',
    },
    'Technetium':
    {   atomicNum: 43,
        atomicMass: 98,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d5',
    },
    'Ruthenium':
    {   atomicNum: 44,
        atomicMass: 101,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d6',
    },
    'Rhodium':
    {   atomicNum: 45,
        atomicMass: 103,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d7',
    },
    'Palladium':
    {   atomicNum: 46,
        atomicMass: 106,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d8',
    },
    'Silver':
    {   atomicNum: 47,
        atomicMass: 108,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d10',
    },
    'Cadmium':
    {   atomicNum: 48,
        atomicMass: 112,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10',
    },
    'Indium':
    {   atomicNum: 49,
        atomicMass: 115,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p1',
    },
    'Tin':
    {   atomicNum: 50,
        atomicMass: 119,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p2',
    },
    'Antimony':
    {   atomicNum: 51,
        atomicMass: 122,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p3',
    },
    'Tellurium':
    {   atomicNum: 52,
        atomicMass: 128,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p4',
    },
    'Iodine':
    {   atomicNum: 53,
        atomicMass: 127,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p5',
    },
    'Xenon':
    {   atomicNum: 54,
        atomicMass: 131,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6',
    },
    'Cesium': // no
    {   atomicNum: 55,
        atomicMass: 133,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1',
    },
    'Barium':
    {   atomicNum: 56,
        atomicMass: 137,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2',
    },
    'Lanthanum': // i hate you i hate you i hate you i hate you
    {   atomicNum: 57,
        atomicMass: 139,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f0 5d1',
    },
    'Cerium':
    {   atomicNum: 58,
        atomicMass: 140,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f1 5d1',
    },
    'Praseodymium':
    {   atomicNum: 59,
        atomicMass: 141,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f3',
    },
    'Neodymium':
    {   atomicNum: 60,
        atomicMass: 144,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f4',
    },
    'Promethium':
    {   atomicNum: 61,
        atomicMass: 145,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f5',
    },
    'Samarium':
    {   atomicNum: 62,
        atomicMass: 150,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f6',
    },
    'Europium':
    {   atomicNum: 63,
        atomicMass: 152,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7',
    },
    'Gadolinium':
    {   atomicNum: 64,
        atomicMass: 157,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7 5d1',
    },
    'Terbium':
    {   atomicNum: 65,
        atomicMass: 159,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f9',
    },
    'Dysprosium':
    {   atomicNum: 66,
        atomicMass: 163,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f10',
    },
    'Holmium':
    {   atomicNum: 67,
        atomicMass: 165,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f11',
    },
    'Erbium':
    {   atomicNum: 68,
        atomicMass: 167,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f12',
    },
    'Thulium':
    {   atomicNum: 69,
        atomicMass: 169,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f13',
    },
    'Ytterbium':
    {   atomicNum: 70,
        atomicMass: 173,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14',
    },
    'Lutetium':
    {   atomicNum: 71,
        atomicMass: 175,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d1',
    },
    'Hafnium':
    {   atomicNum: 72,
        atomicMass: 179,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d2',
    },
    'Tantalum':
    {   atomicNum: 73,
        atomicMass: 181,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d3',
    },
    'Tungsten':
    {   atomicNum: 74,
        atomicMass: 184,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d4',
    },
    'Rhenium':
    {   atomicNum: 75,
        atomicMass: 186,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d5',
    },
    'Osmium':
    {   atomicNum: 76,
        atomicMass: 190,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d6',
    },
    'Iridium':
    {   atomicNum: 77,
        atomicMass: 192,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d7',
    },
    'Platinum':
    {   atomicNum: 78,
        atomicMass: 195,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d8',
    },
    'Gold':
    {   atomicNum: 79,
        atomicMass: 197,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d10',
    },
    'Mercury':
    {   atomicNum: 80,
        atomicMass: 201,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10',
    },
    'Thallium':
    {   atomicNum: 81,
        atomicMass: 204,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p1',
    },
    'Lead':
    {   atomicNum: 82,
        atomicMass: 207,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p2',
    },
    'Bismuth':
    {   atomicNum: 83,
        atomicMass: 209,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p3',
    },
    'Polonium':
    {   atomicNum: 84,
        atomicMass: 209,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p4',
    },
    'Astatine':
    {   atomicNum: 85,
        atomicMass: 210,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p5',
    },
    'Radon':
    {   atomicNum: 86,
        atomicMass: 222,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6',
    },
    'Francium':
    {   atomicNum: 87,
        atomicMass: 223,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s1',
    },
    'Radium':
    {   atomicNum: 88,
        atomicMass: 226,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2',
    },
    'Actinium':
    {   atomicNum: 89,
        atomicMass: 227,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f0 6d1',
    },
    'Thorium':
    {   atomicNum: 90,
        atomicMass: 232,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f0 6d2',
    },
    'Protactinium':
    {   atomicNum: 91,
        atomicMass: 231,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f2 6d1',
    },
    'Uranium':
    {   atomicNum: 92,
        atomicMass: 238,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1',
    },
    'Neptunium':
    {   atomicNum: 93,
        atomicMass: 237,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f4 6d1',
    },
    'Plutonium':
    {   atomicNum: 94,
        atomicMass: 244,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f6',
    },
    'Americium':
    {   atomicNum: 95,
        atomicMass: 243,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7',
    },
    'Curium':
    {   atomicNum: 96,
        atomicMass: 247,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7 6d1',
    },
    'Berkelium':
    {   atomicNum: 97,
        atomicMass: 247,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f9',
    },
    'Californium':
    {   atomicNum: 98,
        atomicMass: 251,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f10',
    },
    'Einsteinium':
    {   atomicNum: 99,
        atomicMass: 252,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f11',
    },
    'Fermium':
    {   atomicNum: 100,
        atomicMass: 257,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f12',
    },
    'Mendelevium':
    {   atomicNum: 101,
        atomicMass: 258,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f13',
    },
    'Nobelium':
    {   atomicNum: 102,
        atomicMass: 259,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14',
    },
    'Lawrencium':
    {   atomicNum: 103,
        atomicMass: 262,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d0 7p1',
    },
    'Rutherfordium':
    {   atomicNum: 104,
        atomicMass: 267,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d2',
    },
    'Dubnium':
    {   atomicNum: 105,
        atomicMass: 262,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d3',
    },
    'Seaborgium':
    {   atomicNum: 106,
        atomicMass: 269,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d4',
    },
    'Bohrium':
    {   atomicNum: 107,
        atomicMass: 264,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d5',
    },
    'Hassium':
    {   atomicNum: 108,
        atomicMass: 269,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d6',
    },
    'Meitnerium':
    {   atomicNum: 109,
        atomicMass: 278,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d7',
    },
    'Darmstadtium':
    {   atomicNum: 110,
        atomicMass: 281,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d8',
    },
    'Roentgenium':
    {   atomicNum: 111,
        atomicMass: 282,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d9',
    },
    'Copernicium':
    {   atomicNum: 112,
        atomicMass: 285,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10',
    },
    'Nihonium':
    {   atomicNum: 113,
        atomicMass: 286,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p1',
    },
    'Flerovium':
    {   atomicNum: 114,
        atomicMass: 289,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p2',
    },
    'Moscovium':
    {   atomicNum: 115,
        atomicMass: 289,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p3',
    },
    'Livermorium':
    {   atomicNum: 116,
        atomicMass: 293,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p4',
    },
    'Tennessine':
    {   atomicNum: 117,
        atomicMass: 294,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p5',
    },
    'Oganesson':
    {   atomicNum: 118,
        atomicMass: 294,
        electronConfig: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6',
    }
}

export { ATOMS };