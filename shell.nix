let
  pkgs = import <nixpkgs> {};

  banner = pkgs.writeShellScriptBin "banner" ''
    clear

    ${pkgs.figlet}/bin/figlet stories
    echo " … for nothing remains of us but the vibrations we leave behind."
  '';

  dev = pkgs.writeShellScriptBin "dev" ''
    ./node_modules/.bin/next dev
  '';

in pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
    pkgs.google-cloud-sdk

    dev
  ];

  shellHook = ''
    if [ -n "$PS1" ]; then
      ${banner}/bin/banner
    fi
  '';
}
