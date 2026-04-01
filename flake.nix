{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    flake-utils.url = "github:numtide/flake-utils";

    nix-develop.url = "github:nicknovitski/nix-develop";
    nix-develop.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      nix-develop,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        banner = pkgs.writeShellScriptBin "banner" ''
          clear

          ${pkgs.figlet}/bin/figlet canvas
        '';

        scripts = {
          dev = pkgs.writeShellScriptBin "dev" ''
            ./node_modules/.bin/next dev
          '';
        };
      in
      {
        packages.nix-develop = nix-develop.packages.${system}.default;

        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs
            pkgs.pnpm
            pkgs.biome
            pkgs.pinact

            scripts.dev
          ];

          shellHook = ''
            ${banner}/bin/banner
          '';
        };

        devShells.workflow = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs
            pkgs.pnpm
            pkgs.biome

            pkgs.curl
          ];

          shellHook = ''
            pnpm install >/dev/null 2>&1
          '';

          PLAYWRIGHT_EXECUTABLE_PATH = "${pkgs.chromium}/bin/chromium";
        };
      }
    );
}
