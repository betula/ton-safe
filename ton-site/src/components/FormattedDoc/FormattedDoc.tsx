import { component } from "remini/preact"
import { DocContainer } from "../../lib/doc/types"
import { FormattedText } from "../FormattedText/FormattedText";

type Props = {
  doc: DocContainer
}

export const FormattedDoc = component(({ doc }: Props) => {

  if (doc.loading || !doc.data.ok) {
    return null
  }

  return (
    <FormattedText text={doc.text} />
  )
});
