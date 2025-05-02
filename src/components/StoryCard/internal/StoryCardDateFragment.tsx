import * as React from "react";

import { defineMessage } from "@formatjs/intl";
import { getIntl } from "src/intl";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = React.Fragment;

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  date?: Date | [Date, Date];
}

async function StoryCardDateFragment(props: Props) {
  const intl = await getIntl("en");

  const { date, ...rest } = props;

  if (!date) {
    return null;
  }

  return (
    <Root {...rest}>
      {(() => {
        if (Array.isArray(date)) {
          const [from, to] = date;

          if (from.getUTCFullYear() === to.getUTCFullYear()) {
            if (from.getUTCMonth() === to.getUTCMonth()) {
              return intl.formatMessage(
                defineMessage({
                  id: "hQR6Zk3",
                  defaultMessage: "{month} {from} – {to}, {year}",
                }),
                {
                  month: intl.formatDate(from, { month: "long" }),
                  from: intl.formatDate(from, { day: "numeric" }),
                  to: intl.formatDate(to, { day: "numeric" }),
                  year: intl.formatDate(to, { year: "numeric" }),
                },
              );
            } else {
              return intl.formatMessage(
                defineMessage({
                  id: "xo4t6Jj",
                  defaultMessage: "{from} – {to}",
                }),
                {
                  from: intl.formatDate(from, { month: "long", day: "numeric" }),
                  to: intl.formatDate(to, { month: "long", day: "numeric", year: "numeric" }),
                },
              );
            }
          } else {
            return intl.formatMessage(
              defineMessage({
                id: "pakxPSK",
                defaultMessage: "{from} – {to}",
              }),
              {
                from: intl.formatDate(from, { month: "long", day: "numeric", year: "numeric" }),
                to: intl.formatDate(to, { month: "long", day: "numeric", year: "numeric" }),
              },
            );
          }
        } else {
          return intl.formatDate(date);
        }
      })()}
    </Root>
  );
}

export default StoryCardDateFragment;
