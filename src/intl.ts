import { IntlShape, createIntl } from "@formatjs/intl";

export async function getIntl(locale: string): Promise<IntlShape> {
  return createIntl({
    locale: locale,
  });
}
