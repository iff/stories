let
  pkgs = import <nixpkgs> {};

  banner = pkgs.writeShellScriptBin "banner" ''
    clear

    ${pkgs.figlet}/bin/figlet -c stories
  '';

  dev = pkgs.writeShellScriptBin "dev" ''
    npm run dev
  '';

in pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-16_x
    pkgs.google-cloud-sdk

    dev
  ];

  shellHook = ''
    if [ -n "$PS1" ]; then
      ${banner}/bin/banner
    fi
  '';
}
