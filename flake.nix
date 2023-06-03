{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };

          banner = pkgs.writeShellScriptBin "banner" ''
            clear

            ${pkgs.figlet}/bin/figlet stories
            echo " … for nothing remains of us but the vibrations we leave behind."
          '';

          node = pkgs.nodejs-18_x;

          scripts = {
            dev = pkgs.writeShellScriptBin "dev" ''
              ./node_modules/.bin/next dev
            '';
          };
        in {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              node
              (pkgs.nodePackages.pnpm.override { inherit node; })

              scripts.dev
            ];

            shellHook = ''
              if [ -n "$PS1" ]; then
                ${banner}/bin/banner
              fi
            '';
          };
        }
      );
}
