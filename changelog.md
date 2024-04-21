# Changelog

I just really wanted to make a changelog. I might make this into a library or something. Who knows.

All changes to this project from 2024-04-06 onwards are documented here.
## [2.0.0] 2024-04-20
### Added
* New boolean to enable colors for atoms (Not yet implemented in GUI)
* Labels for every atom.
### Changed
* GUI now supports every atom.
### Removed
## [1.1.0] 2024-04-10
### Added
* Temporary GUI for selecting atoms.
* Boolean for atom rotation
* Raycasting to highlight particles on hover
* Loading screen that hides the model until all nucleons are static
### Changed
* Modularized Javascript code into app components, manager components, and mesh/body components.
* Separated `AtomManager` class into `BohrAtomManager` and `QuantumAtomManager` classes.
* Adjusted the structure of html in preparation for the addition of more features
* Misc Code optimizations for mesh classes and component classes
### Removed
## [1.0.0] 2024-04-06
### Added
* Transferred code from `class.js` in tool folder to proper source folder for the project.
### Changed
* N/A
### Removed
* Period-individual atom and shell classes have been removed in favor of the simpler and more efficient class system presently used.
* Axes and spotlight helpers have been removed.