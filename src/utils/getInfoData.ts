import * as lodash from "lodash"

export const getInfoData = ({
  fields = [],
  dataObject = {},
}: {
  fields: string[]
  dataObject: any
}) => {
  return lodash.pick(dataObject, fields)
}
