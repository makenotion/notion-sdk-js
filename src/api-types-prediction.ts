import * as APITypes from "./api-types"

function createPrediction<BaseType, Args extends unknown[]>(
  subTypePredicateCreator: (
    ...subTypePredictionArgs: Args
  ) => (theType?: BaseType) => boolean
) {
  return function createTypePrediction<SubType extends BaseType>(
    ...subTypeArgs: Args
  ) {
    const subTypePredicate = subTypePredicateCreator(...subTypeArgs)
    return function isSubType(theType?: BaseType): theType is SubType {
      return subTypePredicate(theType)
    }
  }
}

/**
 * Usage:
 * const isSubType = createPredictionByFunction<BaseType>()<SubType>(theType => theType !== "list")
 */
const createPredictionByFunction = <BaseType>() =>
  createPrediction<BaseType, [(theType?: BaseType) => boolean]>(fn => fn)

/**
 * Usage:
 * "database",const isDatabase = createPredictionOnProperty<BaseType>("object")()("database")
 *
 * Should not declare as `<BaseType, PropertyKey extends keyof BaseType>(propertyKey: PropertyKey) => ...`
 * Because then usages become `createPredictionOnProperty<BaseType, "object">("object")`,
 * note the duplicated "object".
 */
const createPredictionOnProperty =
  <BaseType>() =>
  <PropertyKey extends keyof BaseType>(propertyKey: PropertyKey) =>
    createPrediction<BaseType, [BaseType[typeof propertyKey]]>(
      propertyValue => baseType => baseType?.[propertyKey] === propertyValue
    )

// start of predictions
const createBlockPrediction =
  createPredictionOnProperty<APITypes.Block>()("type")
const Block = {
  isParagraphBlock: createBlockPrediction<APITypes.ParagraphBlock>("paragraph"),
  isHeadingOneBlock:
    createBlockPrediction<APITypes.HeadingOneBlock>("heading_1"),
  isHeadingTwoBlock:
    createBlockPrediction<APITypes.HeadingTwoBlock>("heading_2"),
  isHeadingThreeBlock:
    createBlockPrediction<APITypes.HeadingThreeBlock>("heading_3"),
  isBulletedListItemBlock:
    createBlockPrediction<APITypes.BulletedListItemBlock>("bulleted_list_item"),
  isNumberedListItemBlock:
    createBlockPrediction<APITypes.NumberedListItemBlock>("numbered_list_item"),
  isToDoBlock: createBlockPrediction<APITypes.ToDoBlock>("to_do"),
  isToggleBlock: createBlockPrediction<APITypes.ToggleBlock>("toggle"),
  isChildPageBlock:
    createBlockPrediction<APITypes.ChildPageBlock>("child_page"),
  isUnsupportedBlock:
    createBlockPrediction<APITypes.UnsupportedBlock>("unsupported"),
}

const createPropertyPrediction =
  createPredictionOnProperty<APITypes.Property>()("type")
const Property = {
  isTitleProperty: createPropertyPrediction<APITypes.TitleProperty>("title"),
  isRichTextProperty:
    createPropertyPrediction<APITypes.RichTextProperty>("rich_text"),
  isNumberProperty: createPropertyPrediction<APITypes.NumberProperty>("number"),
  isSelectProperty: createPropertyPrediction<APITypes.SelectProperty>("select"),
  isMultiSelectProperty:
    createPropertyPrediction<APITypes.MultiSelectProperty>("multi_select"),
  isDateProperty: createPropertyPrediction<APITypes.DateProperty>("date"),
  isPeopleProperty: createPropertyPrediction<APITypes.PeopleProperty>("people"),
  isFileProperty: createPropertyPrediction<APITypes.FileProperty>("file"),
  isCheckboxProperty:
    createPropertyPrediction<APITypes.CheckboxProperty>("checkbox"),
  isURLProperty: createPropertyPrediction<APITypes.URLProperty>("url"),
  isEmailProperty: createPropertyPrediction<APITypes.EmailProperty>("email"),
  isPhoneNumberProperty:
    createPropertyPrediction<APITypes.PhoneNumberProperty>("phone_number"),
  isFormulaProperty:
    createPropertyPrediction<APITypes.FormulaProperty>("formula"),
  isRelationProperty:
    createPropertyPrediction<APITypes.RelationProperty>("relation"),
  isRollupProperty: createPropertyPrediction<APITypes.RollupProperty>("rollup"),
  isCreatedTimeProperty:
    createPropertyPrediction<APITypes.CreatedTimeProperty>("created_time"),
  isCreatedByProperty:
    createPropertyPrediction<APITypes.CreatedByProperty>("created_by"),
  isLastEditedTimeProperty:
    createPropertyPrediction<APITypes.LastEditedTimeProperty>(
      "last_edited_time"
    ),
  isLastEditedByProperty:
    createPropertyPrediction<APITypes.LastEditedByProperty>("last_edited_by"),
}

const createFilterPrediction = createPredictionByFunction<APITypes.Filter>()
const Filter = {
  isSinglePropertyFilter: createFilterPrediction<APITypes.SinglePropertyFilter>(
    filter => !(filter && ("and" in filter || "or" in filter))
  ),
  isCompoundFilter: createFilterPrediction<APITypes.CompoundFilter>(filter =>
    Boolean(filter && ("and" in filter || "or" in filter))
  ),
}

const createSingleFilterPrediction = createPrediction<
  APITypes.SinglePropertyFilter,
  [APITypes.SinglePropertyFilter["property"]]
>(property => filter => Boolean(filter && property in filter))
const SinglePropertyFilter = {
  isTextFilter: createSingleFilterPrediction<APITypes.TextFilter>("text"),
  isNumberFilter: createSingleFilterPrediction<APITypes.NumberFilter>("number"),
  isCheckboxFilter:
    createSingleFilterPrediction<APITypes.CheckboxFilter>("checkbox"),
  isSelectFilter: createSingleFilterPrediction<APITypes.SelectFilter>("select"),
  isMultiSelectFilter:
    createSingleFilterPrediction<APITypes.MultiSelectFilter>("multi_select"),
  isDateFilter: createSingleFilterPrediction<APITypes.DateFilter>("date"),
  isPeopleFilter: createSingleFilterPrediction<APITypes.PeopleFilter>("people"),
  isFilesFilter: createSingleFilterPrediction<APITypes.FilesFilter>("files"),
  isRelationFilter:
    createSingleFilterPrediction<APITypes.RelationFilter>("relation"),
  isFormulaFilter:
    createSingleFilterPrediction<APITypes.FormulaFilter>("formula"),
}

const createParentInputPrediction =
  createPredictionByFunction<APITypes.ParentInput>()
const ParentInput = {
  isDatabaseParentInput: createParentInputPrediction(input =>
    Boolean(input && "database_id" in input)
  ),
  isPageParentInput: createParentInputPrediction(input =>
    Boolean(input && "page_id" in input)
  ),
}

const createPropertyValuePrediction =
  createPredictionOnProperty<APITypes.PropertyValue>()("type")
const PropertyValue = {
  isTitlePropertyValue:
    createPropertyValuePrediction<APITypes.TitlePropertyValue>("title"),
  isRichTextPropertyValue:
    createPropertyValuePrediction<APITypes.RichTextPropertyValue>("rich_text"),
  isNumberPropertyValue:
    createPropertyValuePrediction<APITypes.NumberPropertyValue>("number"),
  isSelectPropertyValue:
    createPropertyValuePrediction<APITypes.SelectPropertyValue>("select"),
  isMultiSelectPropertyValue:
    createPropertyValuePrediction<APITypes.MultiSelectPropertyValue>(
      "multi_select"
    ),
  isDatePropertyValue:
    createPropertyValuePrediction<APITypes.DatePropertyValue>("date"),
  isFormulaPropertyValue:
    createPropertyValuePrediction<APITypes.FormulaPropertyValue>("formula"),
  isRollupPropertyValue:
    createPropertyValuePrediction<APITypes.RollupPropertyValue>("rollup"),
  isPeoplePropertyValue:
    createPropertyValuePrediction<APITypes.PeoplePropertyValue>("people"),
  isFilesPropertyValue:
    createPropertyValuePrediction<APITypes.FilesPropertyValue>("files"),
  isCheckboxPropertyValue:
    createPropertyValuePrediction<APITypes.CheckboxPropertyValue>("checkbox"),
  isURLPropertyValue:
    createPropertyValuePrediction<APITypes.URLPropertyValue>("url"),
  isEmailPropertyValue:
    createPropertyValuePrediction<APITypes.EmailPropertyValue>("email"),
  isPhoneNumberPropertyValue:
    createPropertyValuePrediction<APITypes.PhoneNumberPropertyValue>(
      "phone_number"
    ),
  isCreatedTimePropertyValue:
    createPropertyValuePrediction<APITypes.CreatedTimePropertyValue>(
      "created_time"
    ),
  isCreatedByPropertyValue:
    createPropertyValuePrediction<APITypes.CreatedByPropertyValue>(
      "created_by"
    ),
  isLastEditedTimePropertyValue:
    createPropertyValuePrediction<APITypes.LastEditedTimePropertyValue>(
      "last_edited_time"
    ),
  isLastEditedByPropertyValue:
    createPropertyValuePrediction<APITypes.LastEditedByPropertyValue>(
      "last_edited_by"
    ),
}

const createInputPropertyValueWithRequiredIdPrediction =
  createPredictionOnProperty<APITypes.InputPropertyValueWithRequiredId>()(
    "type"
  )
const InputPropertyValueWithRequiredId = {
  isTitleInputPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.TitleInputPropertyValue>(
      "title"
    ),
  isRichTextInputPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.RichTextInputPropertyValue>(
      "rich_text"
    ),
  isNumberPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.NumberPropertyValue>(
      "number"
    ),
  isSelectPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.SelectPropertyValue>(
      "select"
    ),
  isMultiSelectPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.MultiSelectPropertyValue>(
      "multi_select"
    ),
  isDatePropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.DatePropertyValue>(
      "date"
    ),
  isFormulaPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.FormulaPropertyValue>(
      "formula"
    ),
  isRollupPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.RollupPropertyValue>(
      "rollup"
    ),
  isPeoplePropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.PeoplePropertyValue>(
      "people"
    ),
  isFilesPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.FilesPropertyValue>(
      "files"
    ),
  isCheckboxPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.CheckboxPropertyValue>(
      "checkbox"
    ),
  isURLPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.URLPropertyValue>(
      "url"
    ),
  isEmailPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.EmailPropertyValue>(
      "email"
    ),
  isPhoneNumberPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.PhoneNumberPropertyValue>(
      "phone_number"
    ),
  isCreatedTimePropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.CreatedTimePropertyValue>(
      "created_time"
    ),
  isCreatedByPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.CreatedByPropertyValue>(
      "created_by"
    ),
  isLastEditedTimePropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.LastEditedTimePropertyValue>(
      "last_edited_time"
    ),
  isLastEditedByPropertyValue:
    createInputPropertyValueWithRequiredIdPrediction<APITypes.LastEditedByPropertyValue>(
      "last_edited_by"
    ),
}

const createAPIObjectPrediction =
  createPredictionByFunction<APITypes.APIObject>()
const APIObject = {
  isAPISingularObject: createAPIObjectPrediction<APITypes.APISingularObject>(
    theType => theType?.object !== "list"
  ),
  isPaginatedList: createAPIObjectPrediction<APITypes.PaginatedList>(
    theType => theType?.object === "list"
  ),
}

const createAPISingularObjectPrediction =
  createPredictionOnProperty<APITypes.APISingularObject>()("object")
const APISingularObject = {
  isDatabase: createAPISingularObjectPrediction<APITypes.Database>("database"),
  isPage: createAPISingularObjectPrediction<APITypes.Page>("block"),
  isUser: createAPISingularObjectPrediction<APITypes.User>("user"),
  isBlock: createAPISingularObjectPrediction<APITypes.Block>("block"),
}

const createUserPrediction = createPredictionOnProperty<APITypes.User>()("type")
const User = {
  isPersonUser: createUserPrediction<APITypes.PersonUser>("person"),
  isBotUser: createUserPrediction<APITypes.BotUser>("bot"),
}

const createParentPrediction =
  createPredictionOnProperty<APITypes.Parent>()("type")
const Parent = {
  isDatabaseParent:
    createParentPrediction<APITypes.DatabaseParent>("database_id"),
  isPageParent: createParentPrediction<APITypes.PageParent>("page_id"),
  isWorkspaceParent:
    createParentPrediction<APITypes.WorkspaceParent>("workspace"),
}

const createRichTextPrediction =
  createPredictionOnProperty<APITypes.RichText>()("type")
const RichText = {
  isRichTextText: createRichTextPrediction<APITypes.RichTextText>("text"),
  isRichTextMention:
    createRichTextPrediction<APITypes.RichTextMention>("mention"),
  isRichTextEquation:
    createRichTextPrediction<APITypes.RichTextEquation>("equation"),
}

const createRichTextInputPrediction =
  createPredictionOnProperty<APITypes.RichTextInput>()("type")
const RichTextInput = {
  isRichTextInputText:
    createRichTextInputPrediction<APITypes.RichTextTextInput>("text"),
  isRichTextInputMention:
    createRichTextInputPrediction<APITypes.RichTextMention>("mention"),
  isRichTextInputEquation:
    createRichTextInputPrediction<APITypes.RichTextEquation>("equation"),
}

// Wrapping for friendly usages, for example:
// To predicate whether a user is BotUser, use `predicate.User.isBotUser(user)`
// Not exporting the members directly to prevent getting confused with types from api-types.ts
export const predicate = {
  APIObject,
  APISingularObject,
  Block,
  Property,
  User,
  Filter,
  SinglePropertyFilter,
  Parent,
  ParentInput,
  PropertyValue,
  InputPropertyValueWithRequiredId,
  RichText,
  RichTextInput,
}
