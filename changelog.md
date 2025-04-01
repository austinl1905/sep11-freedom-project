# Changelog

I just really wanted to make a changelog. I might make this into a library or something. Who knows.

All changes to this project from 2024-04-06 onwards are documented here.
## [1.3.1] 2025-03-31
### Changed
* Updated three.js version. Eventually I may rewrite this project from scratch to reduce dependencies and having to constantly update the imports.
## [1.3.0] 2024-04-28
### Changed
* Added postprocessing outline effect to replace original raycasting output.
* Major refactoring to the structure of the Atom class and AtomManagers, specifically with the electrons property.
## [1.2.1] 2024-04-21
### Added
* Implemented color in GUI
## [1.2.0] 2024-04-20
### Added
* New boolean to enable colors for atoms (Not yet implemented in GUI)
* Labels for every atom.
### Changed
* GUI now supports every atom.
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
## [1.0.0] 2024-04-06
### Added
* Transferred code from `class.js` in tool folder to proper source folder for the project.
### Changed
* N/A
### Removed
* Period-individual atom and shell classes have been removed in favor of the simpler and more efficient class system presently used.
* Axes and spotlight helpers have been removed.