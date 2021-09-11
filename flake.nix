{
  inputs = {
    devshell.url = "github:numtide/devshell";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, devshell, flake-utils, nixpkgs }:
    flake-utils.lib.simpleFlake {
      inherit self nixpkgs;

      name = "dddenis.github.io";
      preOverlays =
        [ devshell.overlay (final: prev: { nodejs = prev.nodejs-14_x; }) ];
      systems = flake-utils.lib.defaultSystems;

      shell = { pkgs }:
        pkgs.devshell.mkShell {
          motd = "";
          packages = with pkgs; [ yarn ];
        };
    };
}
