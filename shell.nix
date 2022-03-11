let
  pkgs = import <nixpkgs> {};

in pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-16_x

    pkgs.google-cloud-sdk
  ];
}
