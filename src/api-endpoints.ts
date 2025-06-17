// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

type IdRequest = string

type PersonUserObjectResponse = {
  // Indicates this user is a person.
  type: "person"
  // Details about the person, when the `type` of the user is `person`.
  person: {
    // The email of the person.
    email?: string
  }
}

type EmptyObject = Record<string, never>

export type PartialUserObjectResponse = { id: IdRequest; object: "user" }

type BotInfoResponse = {
  owner:
    | {
        type: "user"
        user:
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | PartialUserObjectResponse
      }
    | { type: "workspace"; workspace: true }
  workspace_name: string | null
  // Limits and restrictions that apply to the bot's workspace
  workspace_limits: {
    // The maximum allowable size of a file upload, in bytes
    max_file_upload_size_in_bytes: number
  }
}

type BotUserObjectResponse = {
  // Indicates this user is a bot.
  type: "bot"
  // Details about the bot, when the `type` of the user is `bot`.
  bot: EmptyObject | BotInfoResponse
}

export type UserObjectResponse = UserObjectResponseCommon &
  (PersonUserObjectResponse | BotUserObjectResponse)

type SelectColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"

type PartialSelectResponse = { id: string; name: string; color: SelectColor }

type TimeZoneRequest =
  | "Africa/Abidjan"
  | "Africa/Accra"
  | "Africa/Addis_Ababa"
  | "Africa/Algiers"
  | "Africa/Asmara"
  | "Africa/Asmera"
  | "Africa/Bamako"
  | "Africa/Bangui"
  | "Africa/Banjul"
  | "Africa/Bissau"
  | "Africa/Blantyre"
  | "Africa/Brazzaville"
  | "Africa/Bujumbura"
  | "Africa/Cairo"
  | "Africa/Casablanca"
  | "Africa/Ceuta"
  | "Africa/Conakry"
  | "Africa/Dakar"
  | "Africa/Dar_es_Salaam"
  | "Africa/Djibouti"
  | "Africa/Douala"
  | "Africa/El_Aaiun"
  | "Africa/Freetown"
  | "Africa/Gaborone"
  | "Africa/Harare"
  | "Africa/Johannesburg"
  | "Africa/Juba"
  | "Africa/Kampala"
  | "Africa/Khartoum"
  | "Africa/Kigali"
  | "Africa/Kinshasa"
  | "Africa/Lagos"
  | "Africa/Libreville"
  | "Africa/Lome"
  | "Africa/Luanda"
  | "Africa/Lubumbashi"
  | "Africa/Lusaka"
  | "Africa/Malabo"
  | "Africa/Maputo"
  | "Africa/Maseru"
  | "Africa/Mbabane"
  | "Africa/Mogadishu"
  | "Africa/Monrovia"
  | "Africa/Nairobi"
  | "Africa/Ndjamena"
  | "Africa/Niamey"
  | "Africa/Nouakchott"
  | "Africa/Ouagadougou"
  | "Africa/Porto-Novo"
  | "Africa/Sao_Tome"
  | "Africa/Timbuktu"
  | "Africa/Tripoli"
  | "Africa/Tunis"
  | "Africa/Windhoek"
  | "America/Adak"
  | "America/Anchorage"
  | "America/Anguilla"
  | "America/Antigua"
  | "America/Araguaina"
  | "America/Argentina/Buenos_Aires"
  | "America/Argentina/Catamarca"
  | "America/Argentina/ComodRivadavia"
  | "America/Argentina/Cordoba"
  | "America/Argentina/Jujuy"
  | "America/Argentina/La_Rioja"
  | "America/Argentina/Mendoza"
  | "America/Argentina/Rio_Gallegos"
  | "America/Argentina/Salta"
  | "America/Argentina/San_Juan"
  | "America/Argentina/San_Luis"
  | "America/Argentina/Tucuman"
  | "America/Argentina/Ushuaia"
  | "America/Aruba"
  | "America/Asuncion"
  | "America/Atikokan"
  | "America/Atka"
  | "America/Bahia"
  | "America/Bahia_Banderas"
  | "America/Barbados"
  | "America/Belem"
  | "America/Belize"
  | "America/Blanc-Sablon"
  | "America/Boa_Vista"
  | "America/Bogota"
  | "America/Boise"
  | "America/Buenos_Aires"
  | "America/Cambridge_Bay"
  | "America/Campo_Grande"
  | "America/Cancun"
  | "America/Caracas"
  | "America/Catamarca"
  | "America/Cayenne"
  | "America/Cayman"
  | "America/Chicago"
  | "America/Chihuahua"
  | "America/Ciudad_Juarez"
  | "America/Coral_Harbour"
  | "America/Cordoba"
  | "America/Costa_Rica"
  | "America/Creston"
  | "America/Cuiaba"
  | "America/Curacao"
  | "America/Danmarkshavn"
  | "America/Dawson"
  | "America/Dawson_Creek"
  | "America/Denver"
  | "America/Detroit"
  | "America/Dominica"
  | "America/Edmonton"
  | "America/Eirunepe"
  | "America/El_Salvador"
  | "America/Ensenada"
  | "America/Fort_Nelson"
  | "America/Fort_Wayne"
  | "America/Fortaleza"
  | "America/Glace_Bay"
  | "America/Godthab"
  | "America/Goose_Bay"
  | "America/Grand_Turk"
  | "America/Grenada"
  | "America/Guadeloupe"
  | "America/Guatemala"
  | "America/Guayaquil"
  | "America/Guyana"
  | "America/Halifax"
  | "America/Havana"
  | "America/Hermosillo"
  | "America/Indiana/Indianapolis"
  | "America/Indiana/Knox"
  | "America/Indiana/Marengo"
  | "America/Indiana/Petersburg"
  | "America/Indiana/Tell_City"
  | "America/Indiana/Vevay"
  | "America/Indiana/Vincennes"
  | "America/Indiana/Winamac"
  | "America/Indianapolis"
  | "America/Inuvik"
  | "America/Iqaluit"
  | "America/Jamaica"
  | "America/Jujuy"
  | "America/Juneau"
  | "America/Kentucky/Louisville"
  | "America/Kentucky/Monticello"
  | "America/Knox_IN"
  | "America/Kralendijk"
  | "America/La_Paz"
  | "America/Lima"
  | "America/Los_Angeles"
  | "America/Louisville"
  | "America/Lower_Princes"
  | "America/Maceio"
  | "America/Managua"
  | "America/Manaus"
  | "America/Marigot"
  | "America/Martinique"
  | "America/Matamoros"
  | "America/Mazatlan"
  | "America/Mendoza"
  | "America/Menominee"
  | "America/Merida"
  | "America/Metlakatla"
  | "America/Mexico_City"
  | "America/Miquelon"
  | "America/Moncton"
  | "America/Monterrey"
  | "America/Montevideo"
  | "America/Montreal"
  | "America/Montserrat"
  | "America/Nassau"
  | "America/New_York"
  | "America/Nipigon"
  | "America/Nome"
  | "America/Noronha"
  | "America/North_Dakota/Beulah"
  | "America/North_Dakota/Center"
  | "America/North_Dakota/New_Salem"
  | "America/Nuuk"
  | "America/Ojinaga"
  | "America/Panama"
  | "America/Pangnirtung"
  | "America/Paramaribo"
  | "America/Phoenix"
  | "America/Port-au-Prince"
  | "America/Port_of_Spain"
  | "America/Porto_Acre"
  | "America/Porto_Velho"
  | "America/Puerto_Rico"
  | "America/Punta_Arenas"
  | "America/Rainy_River"
  | "America/Rankin_Inlet"
  | "America/Recife"
  | "America/Regina"
  | "America/Resolute"
  | "America/Rio_Branco"
  | "America/Rosario"
  | "America/Santa_Isabel"
  | "America/Santarem"
  | "America/Santiago"
  | "America/Santo_Domingo"
  | "America/Sao_Paulo"
  | "America/Scoresbysund"
  | "America/Shiprock"
  | "America/Sitka"
  | "America/St_Barthelemy"
  | "America/St_Johns"
  | "America/St_Kitts"
  | "America/St_Lucia"
  | "America/St_Thomas"
  | "America/St_Vincent"
  | "America/Swift_Current"
  | "America/Tegucigalpa"
  | "America/Thule"
  | "America/Thunder_Bay"
  | "America/Tijuana"
  | "America/Toronto"
  | "America/Tortola"
  | "America/Vancouver"
  | "America/Virgin"
  | "America/Whitehorse"
  | "America/Winnipeg"
  | "America/Yakutat"
  | "America/Yellowknife"
  | "Antarctica/Casey"
  | "Antarctica/Davis"
  | "Antarctica/DumontDUrville"
  | "Antarctica/Macquarie"
  | "Antarctica/Mawson"
  | "Antarctica/McMurdo"
  | "Antarctica/Palmer"
  | "Antarctica/Rothera"
  | "Antarctica/South_Pole"
  | "Antarctica/Syowa"
  | "Antarctica/Troll"
  | "Antarctica/Vostok"
  | "Arctic/Longyearbyen"
  | "Asia/Aden"
  | "Asia/Almaty"
  | "Asia/Amman"
  | "Asia/Anadyr"
  | "Asia/Aqtau"
  | "Asia/Aqtobe"
  | "Asia/Ashgabat"
  | "Asia/Ashkhabad"
  | "Asia/Atyrau"
  | "Asia/Baghdad"
  | "Asia/Bahrain"
  | "Asia/Baku"
  | "Asia/Bangkok"
  | "Asia/Barnaul"
  | "Asia/Beirut"
  | "Asia/Bishkek"
  | "Asia/Brunei"
  | "Asia/Calcutta"
  | "Asia/Chita"
  | "Asia/Choibalsan"
  | "Asia/Chongqing"
  | "Asia/Chungking"
  | "Asia/Colombo"
  | "Asia/Dacca"
  | "Asia/Damascus"
  | "Asia/Dhaka"
  | "Asia/Dili"
  | "Asia/Dubai"
  | "Asia/Dushanbe"
  | "Asia/Famagusta"
  | "Asia/Gaza"
  | "Asia/Harbin"
  | "Asia/Hebron"
  | "Asia/Ho_Chi_Minh"
  | "Asia/Hong_Kong"
  | "Asia/Hovd"
  | "Asia/Irkutsk"
  | "Asia/Istanbul"
  | "Asia/Jakarta"
  | "Asia/Jayapura"
  | "Asia/Jerusalem"
  | "Asia/Kabul"
  | "Asia/Kamchatka"
  | "Asia/Karachi"
  | "Asia/Kashgar"
  | "Asia/Kathmandu"
  | "Asia/Katmandu"
  | "Asia/Khandyga"
  | "Asia/Kolkata"
  | "Asia/Krasnoyarsk"
  | "Asia/Kuala_Lumpur"
  | "Asia/Kuching"
  | "Asia/Kuwait"
  | "Asia/Macao"
  | "Asia/Macau"
  | "Asia/Magadan"
  | "Asia/Makassar"
  | "Asia/Manila"
  | "Asia/Muscat"
  | "Asia/Nicosia"
  | "Asia/Novokuznetsk"
  | "Asia/Novosibirsk"
  | "Asia/Omsk"
  | "Asia/Oral"
  | "Asia/Phnom_Penh"
  | "Asia/Pontianak"
  | "Asia/Pyongyang"
  | "Asia/Qatar"
  | "Asia/Qostanay"
  | "Asia/Qyzylorda"
  | "Asia/Rangoon"
  | "Asia/Riyadh"
  | "Asia/Saigon"
  | "Asia/Sakhalin"
  | "Asia/Samarkand"
  | "Asia/Seoul"
  | "Asia/Shanghai"
  | "Asia/Singapore"
  | "Asia/Srednekolymsk"
  | "Asia/Taipei"
  | "Asia/Tashkent"
  | "Asia/Tbilisi"
  | "Asia/Tehran"
  | "Asia/Tel_Aviv"
  | "Asia/Thimbu"
  | "Asia/Thimphu"
  | "Asia/Tokyo"
  | "Asia/Tomsk"
  | "Asia/Ujung_Pandang"
  | "Asia/Ulaanbaatar"
  | "Asia/Ulan_Bator"
  | "Asia/Urumqi"
  | "Asia/Ust-Nera"
  | "Asia/Vientiane"
  | "Asia/Vladivostok"
  | "Asia/Yakutsk"
  | "Asia/Yangon"
  | "Asia/Yekaterinburg"
  | "Asia/Yerevan"
  | "Atlantic/Azores"
  | "Atlantic/Bermuda"
  | "Atlantic/Canary"
  | "Atlantic/Cape_Verde"
  | "Atlantic/Faeroe"
  | "Atlantic/Faroe"
  | "Atlantic/Jan_Mayen"
  | "Atlantic/Madeira"
  | "Atlantic/Reykjavik"
  | "Atlantic/South_Georgia"
  | "Atlantic/St_Helena"
  | "Atlantic/Stanley"
  | "Australia/ACT"
  | "Australia/Adelaide"
  | "Australia/Brisbane"
  | "Australia/Broken_Hill"
  | "Australia/Canberra"
  | "Australia/Currie"
  | "Australia/Darwin"
  | "Australia/Eucla"
  | "Australia/Hobart"
  | "Australia/LHI"
  | "Australia/Lindeman"
  | "Australia/Lord_Howe"
  | "Australia/Melbourne"
  | "Australia/NSW"
  | "Australia/North"
  | "Australia/Perth"
  | "Australia/Queensland"
  | "Australia/South"
  | "Australia/Sydney"
  | "Australia/Tasmania"
  | "Australia/Victoria"
  | "Australia/West"
  | "Australia/Yancowinna"
  | "Brazil/Acre"
  | "Brazil/DeNoronha"
  | "Brazil/East"
  | "Brazil/West"
  | "CET"
  | "CST6CDT"
  | "Canada/Atlantic"
  | "Canada/Central"
  | "Canada/Eastern"
  | "Canada/Mountain"
  | "Canada/Newfoundland"
  | "Canada/Pacific"
  | "Canada/Saskatchewan"
  | "Canada/Yukon"
  | "Chile/Continental"
  | "Chile/EasterIsland"
  | "Cuba"
  | "EET"
  | "EST"
  | "EST5EDT"
  | "Egypt"
  | "Eire"
  | "Etc/GMT"
  | "Etc/GMT+0"
  | "Etc/GMT+1"
  | "Etc/GMT+10"
  | "Etc/GMT+11"
  | "Etc/GMT+12"
  | "Etc/GMT+2"
  | "Etc/GMT+3"
  | "Etc/GMT+4"
  | "Etc/GMT+5"
  | "Etc/GMT+6"
  | "Etc/GMT+7"
  | "Etc/GMT+8"
  | "Etc/GMT+9"
  | "Etc/GMT-0"
  | "Etc/GMT-1"
  | "Etc/GMT-10"
  | "Etc/GMT-11"
  | "Etc/GMT-12"
  | "Etc/GMT-13"
  | "Etc/GMT-14"
  | "Etc/GMT-2"
  | "Etc/GMT-3"
  | "Etc/GMT-4"
  | "Etc/GMT-5"
  | "Etc/GMT-6"
  | "Etc/GMT-7"
  | "Etc/GMT-8"
  | "Etc/GMT-9"
  | "Etc/GMT0"
  | "Etc/Greenwich"
  | "Etc/UCT"
  | "Etc/UTC"
  | "Etc/Universal"
  | "Etc/Zulu"
  | "Europe/Amsterdam"
  | "Europe/Andorra"
  | "Europe/Astrakhan"
  | "Europe/Athens"
  | "Europe/Belfast"
  | "Europe/Belgrade"
  | "Europe/Berlin"
  | "Europe/Bratislava"
  | "Europe/Brussels"
  | "Europe/Bucharest"
  | "Europe/Budapest"
  | "Europe/Busingen"
  | "Europe/Chisinau"
  | "Europe/Copenhagen"
  | "Europe/Dublin"
  | "Europe/Gibraltar"
  | "Europe/Guernsey"
  | "Europe/Helsinki"
  | "Europe/Isle_of_Man"
  | "Europe/Istanbul"
  | "Europe/Jersey"
  | "Europe/Kaliningrad"
  | "Europe/Kiev"
  | "Europe/Kirov"
  | "Europe/Kyiv"
  | "Europe/Lisbon"
  | "Europe/Ljubljana"
  | "Europe/London"
  | "Europe/Luxembourg"
  | "Europe/Madrid"
  | "Europe/Malta"
  | "Europe/Mariehamn"
  | "Europe/Minsk"
  | "Europe/Monaco"
  | "Europe/Moscow"
  | "Europe/Nicosia"
  | "Europe/Oslo"
  | "Europe/Paris"
  | "Europe/Podgorica"
  | "Europe/Prague"
  | "Europe/Riga"
  | "Europe/Rome"
  | "Europe/Samara"
  | "Europe/San_Marino"
  | "Europe/Sarajevo"
  | "Europe/Saratov"
  | "Europe/Simferopol"
  | "Europe/Skopje"
  | "Europe/Sofia"
  | "Europe/Stockholm"
  | "Europe/Tallinn"
  | "Europe/Tirane"
  | "Europe/Tiraspol"
  | "Europe/Ulyanovsk"
  | "Europe/Uzhgorod"
  | "Europe/Vaduz"
  | "Europe/Vatican"
  | "Europe/Vienna"
  | "Europe/Vilnius"
  | "Europe/Volgograd"
  | "Europe/Warsaw"
  | "Europe/Zagreb"
  | "Europe/Zaporozhye"
  | "Europe/Zurich"
  | "GB"
  | "GB-Eire"
  | "GMT"
  | "GMT+0"
  | "GMT-0"
  | "GMT0"
  | "Greenwich"
  | "HST"
  | "Hongkong"
  | "Iceland"
  | "Indian/Antananarivo"
  | "Indian/Chagos"
  | "Indian/Christmas"
  | "Indian/Cocos"
  | "Indian/Comoro"
  | "Indian/Kerguelen"
  | "Indian/Mahe"
  | "Indian/Maldives"
  | "Indian/Mauritius"
  | "Indian/Mayotte"
  | "Indian/Reunion"
  | "Iran"
  | "Israel"
  | "Jamaica"
  | "Japan"
  | "Kwajalein"
  | "Libya"
  | "MET"
  | "MST"
  | "MST7MDT"
  | "Mexico/BajaNorte"
  | "Mexico/BajaSur"
  | "Mexico/General"
  | "NZ"
  | "NZ-CHAT"
  | "Navajo"
  | "PRC"
  | "PST8PDT"
  | "Pacific/Apia"
  | "Pacific/Auckland"
  | "Pacific/Bougainville"
  | "Pacific/Chatham"
  | "Pacific/Chuuk"
  | "Pacific/Easter"
  | "Pacific/Efate"
  | "Pacific/Enderbury"
  | "Pacific/Fakaofo"
  | "Pacific/Fiji"
  | "Pacific/Funafuti"
  | "Pacific/Galapagos"
  | "Pacific/Gambier"
  | "Pacific/Guadalcanal"
  | "Pacific/Guam"
  | "Pacific/Honolulu"
  | "Pacific/Johnston"
  | "Pacific/Kanton"
  | "Pacific/Kiritimati"
  | "Pacific/Kosrae"
  | "Pacific/Kwajalein"
  | "Pacific/Majuro"
  | "Pacific/Marquesas"
  | "Pacific/Midway"
  | "Pacific/Nauru"
  | "Pacific/Niue"
  | "Pacific/Norfolk"
  | "Pacific/Noumea"
  | "Pacific/Pago_Pago"
  | "Pacific/Palau"
  | "Pacific/Pitcairn"
  | "Pacific/Pohnpei"
  | "Pacific/Ponape"
  | "Pacific/Port_Moresby"
  | "Pacific/Rarotonga"
  | "Pacific/Saipan"
  | "Pacific/Samoa"
  | "Pacific/Tahiti"
  | "Pacific/Tarawa"
  | "Pacific/Tongatapu"
  | "Pacific/Truk"
  | "Pacific/Wake"
  | "Pacific/Wallis"
  | "Pacific/Yap"
  | "Poland"
  | "Portugal"
  | "ROC"
  | "ROK"
  | "Singapore"
  | "Turkey"
  | "UCT"
  | "US/Alaska"
  | "US/Aleutian"
  | "US/Arizona"
  | "US/Central"
  | "US/East-Indiana"
  | "US/Eastern"
  | "US/Hawaii"
  | "US/Indiana-Starke"
  | "US/Michigan"
  | "US/Mountain"
  | "US/Pacific"
  | "US/Pacific-New"
  | "US/Samoa"
  | "UTC"
  | "Universal"
  | "W-SU"
  | "WET"
  | "Zulu"

type DateResponse = {
  // The start date of the date object.
  start: string
  // The end date of the date object, if any.
  end?: string | null
  // The time zone of the date object, if any.
  time_zone?: string | null
}

type StringRequest = string

type TextRequest = string

type StringFormulaPropertyResponse = { type: "string"; string: string | null }

type DateFormulaPropertyResponse = { type: "date"; date: DateResponse | null }

type NumberFormulaPropertyResponse = { type: "number"; number: number | null }

type BooleanFormulaPropertyResponse = {
  type: "boolean"
  boolean: boolean | null
}

type FormulaPropertyResponse =
  | StringFormulaPropertyResponse
  | DateFormulaPropertyResponse
  | NumberFormulaPropertyResponse
  | BooleanFormulaPropertyResponse

type VerificationPropertyUnverifiedResponse = {
  state: "unverified"
  date: null
  verified_by: null
}

type VerificationPropertyResponse = {
  state: "verified" | "expired"
  date: DateResponse | null
  verified_by:
    | { id: IdRequest }
    | {
        person: { email?: string }
        id: IdRequest
        type?: "person"
        name?: string | null
        avatar_url?: string | null
        object?: "user"
      }
    | {
        bot: EmptyObject | BotInfoResponse
        id: IdRequest
        type?: "bot"
        name?: string | null
        avatar_url?: string | null
        object?: "user"
      }
    | null
}

type AnnotationResponse = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: ApiColor
}

type TextRichTextItemResponse = {
  type: "text"
  // If a rich text object's type value is `text`, then the corresponding text field
  // contains an object including the text content and any inline link.
  text: {
    // The actual text content of the text.
    content: string
    // An object with information about any inline link in this text, if included.
    link: {
      // The URL of the link.
      url: string
    } | null
  }
}

type LinkPreviewMentionResponse = {
  // The URL of the link preview mention.
  url: string
}

type LinkMentionResponse = {
  // The href of the link mention.
  href: string
  // The title of the link.
  title?: string
  // The description of the link.
  description?: string
  // The author of the link.
  link_author?: string
  // The provider of the link.
  link_provider?: string
  // The thumbnail URL of the link.
  thumbnail_url?: string
  // The icon URL of the link.
  icon_url?: string
  // The iframe URL of the link.
  iframe_url?: string
  // The height of the link preview iframe.
  height?: number
  // The padding of the link preview iframe.
  padding?: number
  // The top padding of the link preview iframe.
  padding_top?: number
}

type TemplateMentionDateTemplateMentionResponse = {
  type: "template_mention_date"
  // The date of the template mention.
  template_mention_date: "today" | "now"
}

type TemplateMentionUserTemplateMentionResponse = {
  type: "template_mention_user"
  // The user of the template mention.
  template_mention_user: "me"
}

type TemplateMentionResponse =
  | TemplateMentionDateTemplateMentionResponse
  | TemplateMentionUserTemplateMentionResponse

type CustomEmojiResponse = {
  // The ID of the custom emoji.
  id: string
  // The name of the custom emoji.
  name: string
  // The URL of the custom emoji.
  url: string
}

type MentionRichTextItemResponse = {
  type: "mention"
  // Mention objects represent an inline mention of a database, date, link preview mention,
  // page, template mention, or user. A mention is created in the Notion UI when a user
  // types `@` followed by the name of the reference.
  mention:
    | {
        type: "user"
        // Details of the user mention.
        user: PartialUserObjectResponse | UserObjectResponse
      }
    | {
        type: "date"
        // Details of the date mention.
        date: DateResponse
      }
    | {
        type: "link_preview"
        // Details of the link preview mention.
        link_preview: LinkPreviewMentionResponse
      }
    | {
        type: "link_mention"
        // Details of the link mention.
        link_mention: LinkMentionResponse
      }
    | {
        type: "page"
        // Details of the page mention.
        page: {
          // The ID of the page in the mention.
          id: string
        }
      }
    | {
        type: "database"
        // Details of the database mention.
        database: {
          // The ID of the database in the mention.
          id: string
        }
      }
    | {
        type: "template_mention"
        // Details of the template mention.
        template_mention: TemplateMentionResponse
      }
    | {
        type: "custom_emoji"
        // Details of the custom emoji mention.
        custom_emoji: CustomEmojiResponse
      }
}

type EquationRichTextItemResponse = {
  type: "equation"
  // Notion supports inline LaTeX equations as rich text objects with a type value of
  // `equation`.
  equation: {
    // A KaTeX compatible string.
    expression: string
  }
}

export type RichTextItemResponse = RichTextItemResponseCommon &
  (
    | TextRichTextItemResponse
    | MentionRichTextItemResponse
    | EquationRichTextItemResponse
  )

type RollupFunction =
  | "count"
  | "count_values"
  | "empty"
  | "not_empty"
  | "unique"
  | "show_unique"
  | "percent_empty"
  | "percent_not_empty"
  | "sum"
  | "average"
  | "median"
  | "min"
  | "max"
  | "range"
  | "earliest_date"
  | "latest_date"
  | "date_range"
  | "checked"
  | "unchecked"
  | "percent_checked"
  | "percent_unchecked"
  | "count_per_group"
  | "percent_per_group"
  | "show_original"

type EmojiRequest =
  | "😀"
  | "😃"
  | "😄"
  | "😁"
  | "😆"
  | "😅"
  | "🤣"
  | "😂"
  | "🙂"
  | "🙃"
  | "🫠"
  | "😉"
  | "😊"
  | "😇"
  | "🥰"
  | "😍"
  | "🤩"
  | "😘"
  | "😗"
  | "☺️"
  | "☺"
  | "😚"
  | "😙"
  | "🥲"
  | "😋"
  | "😛"
  | "😜"
  | "🤪"
  | "😝"
  | "🤑"
  | "🤗"
  | "🤭"
  | "🫢"
  | "🫣"
  | "🤫"
  | "🤔"
  | "🫡"
  | "🤐"
  | "🤨"
  | "😐"
  | "😑"
  | "😶"
  | "🫥"
  | "😶‍🌫️"
  | "😶‍🌫"
  | "😏"
  | "😒"
  | "🙄"
  | "😬"
  | "😮‍💨"
  | "🤥"
  | "😌"
  | "😔"
  | "😪"
  | "🤤"
  | "😴"
  | "😷"
  | "🤒"
  | "🤕"
  | "🤢"
  | "🤮"
  | "🤧"
  | "🥵"
  | "🥶"
  | "🥴"
  | "😵"
  | "😵‍💫"
  | "🤯"
  | "🤠"
  | "🥳"
  | "🥸"
  | "😎"
  | "🤓"
  | "🧐"
  | "😕"
  | "🫤"
  | "😟"
  | "🙁"
  | "☹️"
  | "☹"
  | "😮"
  | "😯"
  | "😲"
  | "😳"
  | "🥺"
  | "🥹"
  | "😦"
  | "😧"
  | "😨"
  | "😰"
  | "😥"
  | "😢"
  | "😭"
  | "😱"
  | "😖"
  | "😣"
  | "😞"
  | "😓"
  | "😩"
  | "😫"
  | "🥱"
  | "😤"
  | "😡"
  | "😠"
  | "🤬"
  | "😈"
  | "👿"
  | "💀"
  | "☠️"
  | "☠"
  | "💩"
  | "🤡"
  | "👹"
  | "👺"
  | "👻"
  | "👽"
  | "👾"
  | "🤖"
  | "😺"
  | "😸"
  | "😹"
  | "😻"
  | "😼"
  | "😽"
  | "🙀"
  | "😿"
  | "😾"
  | "🙈"
  | "🙉"
  | "🙊"
  | "💋"
  | "💌"
  | "💘"
  | "💝"
  | "💖"
  | "💗"
  | "💓"
  | "💞"
  | "💕"
  | "💟"
  | "❣️"
  | "❣"
  | "💔"
  | "❤️‍🔥"
  | "❤‍🔥"
  | "❤️‍🩹"
  | "❤‍🩹"
  | "❤️"
  | "❤"
  | "🧡"
  | "💛"
  | "💚"
  | "💙"
  | "💜"
  | "🤎"
  | "🖤"
  | "🤍"
  | "💯"
  | "💢"
  | "💥"
  | "💫"
  | "💦"
  | "💨"
  | "🕳️"
  | "🕳"
  | "💣"
  | "💬"
  | "👁️‍🗨️"
  | "🗨️"
  | "🗨"
  | "🗯️"
  | "🗯"
  | "💭"
  | "💤"
  | "👋🏻"
  | "👋🏼"
  | "👋🏽"
  | "👋🏾"
  | "👋🏿"
  | "👋"
  | "🤚🏻"
  | "🤚🏼"
  | "🤚🏽"
  | "🤚🏾"
  | "🤚🏿"
  | "🤚"
  | "🖐🏻"
  | "🖐🏼"
  | "🖐🏽"
  | "🖐🏾"
  | "🖐🏿"
  | "🖐️"
  | "🖐"
  | "✋🏻"
  | "✋🏼"
  | "✋🏽"
  | "✋🏾"
  | "✋🏿"
  | "✋"
  | "🖖🏻"
  | "🖖🏼"
  | "🖖🏽"
  | "🖖🏾"
  | "🖖🏿"
  | "🖖"
  | "🫱🏻"
  | "🫱🏼"
  | "🫱🏽"
  | "🫱🏾"
  | "🫱🏿"
  | "🫱"
  | "🫲🏻"
  | "🫲🏼"
  | "🫲🏽"
  | "🫲🏾"
  | "🫲🏿"
  | "🫲"
  | "🫳🏻"
  | "🫳🏼"
  | "🫳🏽"
  | "🫳🏾"
  | "🫳🏿"
  | "🫳"
  | "🫴🏻"
  | "🫴🏼"
  | "🫴🏽"
  | "🫴🏾"
  | "🫴🏿"
  | "🫴"
  | "👌🏻"
  | "👌🏼"
  | "👌🏽"
  | "👌🏾"
  | "👌🏿"
  | "👌"
  | "🤌🏻"
  | "🤌🏼"
  | "🤌🏽"
  | "🤌🏾"
  | "🤌🏿"
  | "🤌"
  | "🤏🏻"
  | "🤏🏼"
  | "🤏🏽"
  | "🤏🏾"
  | "🤏🏿"
  | "🤏"
  | "✌🏻"
  | "✌🏼"
  | "✌🏽"
  | "✌🏾"
  | "✌🏿"
  | "✌️"
  | "✌"
  | "🤞🏻"
  | "🤞🏼"
  | "🤞🏽"
  | "🤞🏾"
  | "🤞🏿"
  | "🤞"
  | "🫰🏻"
  | "🫰🏼"
  | "🫰🏽"
  | "🫰🏾"
  | "🫰🏿"
  | "🫰"
  | "🤟🏻"
  | "🤟🏼"
  | "🤟🏽"
  | "🤟🏾"
  | "🤟🏿"
  | "🤟"
  | "🤘🏻"
  | "🤘🏼"
  | "🤘🏽"
  | "🤘🏾"
  | "🤘🏿"
  | "🤘"
  | "🤙🏻"
  | "🤙🏼"
  | "🤙🏽"
  | "🤙🏾"
  | "🤙🏿"
  | "🤙"
  | "👈🏻"
  | "👈🏼"
  | "👈🏽"
  | "👈🏾"
  | "👈🏿"
  | "👈"
  | "👉🏻"
  | "👉🏼"
  | "👉🏽"
  | "👉🏾"
  | "👉🏿"
  | "👉"
  | "👆🏻"
  | "👆🏼"
  | "👆🏽"
  | "👆🏾"
  | "👆🏿"
  | "👆"
  | "🖕🏻"
  | "🖕🏼"
  | "🖕🏽"
  | "🖕🏾"
  | "🖕🏿"
  | "🖕"
  | "👇🏻"
  | "👇🏼"
  | "👇🏽"
  | "👇🏾"
  | "👇🏿"
  | "👇"
  | "☝🏻"
  | "☝🏼"
  | "☝🏽"
  | "☝🏾"
  | "☝🏿"
  | "☝️"
  | "☝"
  | "🫵🏻"
  | "🫵🏼"
  | "🫵🏽"
  | "🫵🏾"
  | "🫵🏿"
  | "🫵"
  | "👍🏻"
  | "👍🏼"
  | "👍🏽"
  | "👍🏾"
  | "👍🏿"
  | "👍"
  | "👎🏻"
  | "👎🏼"
  | "👎🏽"
  | "👎🏾"
  | "👎🏿"
  | "👎"
  | "✊🏻"
  | "✊🏼"
  | "✊🏽"
  | "✊🏾"
  | "✊🏿"
  | "✊"
  | "👊🏻"
  | "👊🏼"
  | "👊🏽"
  | "👊🏾"
  | "👊🏿"
  | "👊"
  | "🤛🏻"
  | "🤛🏼"
  | "🤛🏽"
  | "🤛🏾"
  | "🤛🏿"
  | "🤛"
  | "🤜🏻"
  | "🤜🏼"
  | "🤜🏽"
  | "🤜🏾"
  | "🤜🏿"
  | "🤜"
  | "👏🏻"
  | "👏🏼"
  | "👏🏽"
  | "👏🏾"
  | "👏🏿"
  | "👏"
  | "🙌🏻"
  | "🙌🏼"
  | "🙌🏽"
  | "🙌🏾"
  | "🙌🏿"
  | "🙌"
  | "🫶🏻"
  | "🫶🏼"
  | "🫶🏽"
  | "🫶🏾"
  | "🫶🏿"
  | "🫶"
  | "👐🏻"
  | "👐🏼"
  | "👐🏽"
  | "👐🏾"
  | "👐🏿"
  | "👐"
  | "🤲🏻"
  | "🤲🏼"
  | "🤲🏽"
  | "🤲🏾"
  | "🤲🏿"
  | "🤲"
  | "🤝🏻"
  | "🤝🏼"
  | "🤝🏽"
  | "🤝🏾"
  | "🤝🏿"
  | "🫱🏻‍🫲🏼"
  | "🫱🏻‍🫲🏽"
  | "🫱🏻‍🫲🏾"
  | "🫱🏻‍🫲🏿"
  | "🫱🏼‍🫲🏻"
  | "🫱🏼‍🫲🏽"
  | "🫱🏼‍🫲🏾"
  | "🫱🏼‍🫲🏿"
  | "🫱🏽‍🫲🏻"
  | "🫱🏽‍🫲🏼"
  | "🫱🏽‍🫲🏾"
  | "🫱🏽‍🫲🏿"
  | "🫱🏾‍🫲🏻"
  | "🫱🏾‍🫲🏼"
  | "🫱🏾‍🫲🏽"
  | "🫱🏾‍🫲🏿"
  | "🫱🏿‍🫲🏻"
  | "🫱🏿‍🫲🏼"
  | "🫱🏿‍🫲🏽"
  | "🫱🏿‍🫲🏾"
  | "🤝"
  | "🙏🏻"
  | "🙏🏼"
  | "🙏🏽"
  | "🙏🏾"
  | "🙏🏿"
  | "🙏"
  | "✍🏻"
  | "✍🏼"
  | "✍🏽"
  | "✍🏾"
  | "✍🏿"
  | "✍️"
  | "✍"
  | "💅🏻"
  | "💅🏼"
  | "💅🏽"
  | "💅🏾"
  | "💅🏿"
  | "💅"
  | "🤳🏻"
  | "🤳🏼"
  | "🤳🏽"
  | "🤳🏾"
  | "🤳🏿"
  | "🤳"
  | "💪🏻"
  | "💪🏼"
  | "💪🏽"
  | "💪🏾"
  | "💪🏿"
  | "💪"
  | "🦾"
  | "🦿"
  | "🦵🏻"
  | "🦵🏼"
  | "🦵🏽"
  | "🦵🏾"
  | "🦵🏿"
  | "🦵"
  | "🦶🏻"
  | "🦶🏼"
  | "🦶🏽"
  | "🦶🏾"
  | "🦶🏿"
  | "🦶"
  | "👂🏻"
  | "👂🏼"
  | "👂🏽"
  | "👂🏾"
  | "👂🏿"
  | "👂"
  | "🦻🏻"
  | "🦻🏼"
  | "🦻🏽"
  | "🦻🏾"
  | "🦻🏿"
  | "🦻"
  | "👃🏻"
  | "👃🏼"
  | "👃🏽"
  | "👃🏾"
  | "👃🏿"
  | "👃"
  | "🧠"
  | "🫀"
  | "🫁"
  | "🦷"
  | "🦴"
  | "👀"
  | "👁️"
  | "👁"
  | "👅"
  | "👄"
  | "🫦"
  | "👶🏻"
  | "👶🏼"
  | "👶🏽"
  | "👶🏾"
  | "👶🏿"
  | "👶"
  | "🧒🏻"
  | "🧒🏼"
  | "🧒🏽"
  | "🧒🏾"
  | "🧒🏿"
  | "🧒"
  | "👦🏻"
  | "👦🏼"
  | "👦🏽"
  | "👦🏾"
  | "👦🏿"
  | "👦"
  | "👧🏻"
  | "👧🏼"
  | "👧🏽"
  | "👧🏾"
  | "👧🏿"
  | "👧"
  | "🧑🏻"
  | "🧑🏼"
  | "🧑🏽"
  | "🧑🏾"
  | "🧑🏿"
  | "🧑"
  | "👱🏻"
  | "👱🏼"
  | "👱🏽"
  | "👱🏾"
  | "👱🏿"
  | "👱"
  | "👨🏻"
  | "👨🏼"
  | "👨🏽"
  | "👨🏾"
  | "👨🏿"
  | "👨"
  | "🧔🏻"
  | "🧔🏼"
  | "🧔🏽"
  | "🧔🏾"
  | "🧔🏿"
  | "🧔"
  | "🧔🏻‍♂️"
  | "🧔🏼‍♂️"
  | "🧔🏽‍♂️"
  | "🧔🏾‍♂️"
  | "🧔🏿‍♂️"
  | "🧔‍♂️"
  | "🧔‍♂"
  | "🧔🏻‍♀️"
  | "🧔🏼‍♀️"
  | "🧔🏽‍♀️"
  | "🧔🏾‍♀️"
  | "🧔🏿‍♀️"
  | "🧔‍♀️"
  | "🧔‍♀"
  | "👨🏻‍🦰"
  | "👨🏼‍🦰"
  | "👨🏽‍🦰"
  | "👨🏾‍🦰"
  | "👨🏿‍🦰"
  | "👨‍🦰"
  | "👨🏻‍🦱"
  | "👨🏼‍🦱"
  | "👨🏽‍🦱"
  | "👨🏾‍🦱"
  | "👨🏿‍🦱"
  | "👨‍🦱"
  | "👨🏻‍🦳"
  | "👨🏼‍🦳"
  | "👨🏽‍🦳"
  | "👨🏾‍🦳"
  | "👨🏿‍🦳"
  | "👨‍🦳"
  | "👨🏻‍🦲"
  | "👨🏼‍🦲"
  | "👨🏽‍🦲"
  | "👨🏾‍🦲"
  | "👨🏿‍🦲"
  | "👨‍🦲"
  | "👩🏻"
  | "👩🏼"
  | "👩🏽"
  | "👩🏾"
  | "👩🏿"
  | "👩"
  | "👩🏻‍🦰"
  | "👩🏼‍🦰"
  | "👩🏽‍🦰"
  | "👩🏾‍🦰"
  | "👩🏿‍🦰"
  | "👩‍🦰"
  | "🧑🏻‍🦰"
  | "🧑🏼‍🦰"
  | "🧑🏽‍🦰"
  | "🧑🏾‍🦰"
  | "🧑🏿‍🦰"
  | "🧑‍🦰"
  | "👩🏻‍🦱"
  | "👩🏼‍🦱"
  | "👩🏽‍🦱"
  | "👩🏾‍🦱"
  | "👩🏿‍🦱"
  | "👩‍🦱"
  | "🧑🏻‍🦱"
  | "🧑🏼‍🦱"
  | "🧑🏽‍🦱"
  | "🧑🏾‍🦱"
  | "🧑🏿‍🦱"
  | "🧑‍🦱"
  | "👩🏻‍🦳"
  | "👩🏼‍🦳"
  | "👩🏽‍🦳"
  | "👩🏾‍🦳"
  | "👩🏿‍🦳"
  | "👩‍🦳"
  | "🧑🏻‍🦳"
  | "🧑🏼‍🦳"
  | "🧑🏽‍🦳"
  | "🧑🏾‍🦳"
  | "🧑🏿‍🦳"
  | "🧑‍🦳"
  | "👩🏻‍🦲"
  | "👩🏼‍🦲"
  | "👩🏽‍🦲"
  | "👩🏾‍🦲"
  | "👩🏿‍🦲"
  | "👩‍🦲"
  | "🧑🏻‍🦲"
  | "🧑🏼‍🦲"
  | "🧑🏽‍🦲"
  | "🧑🏾‍🦲"
  | "🧑🏿‍🦲"
  | "🧑‍🦲"
  | "👱🏻‍♀️"
  | "👱🏼‍♀️"
  | "👱🏽‍♀️"
  | "👱🏾‍♀️"
  | "👱🏿‍♀️"
  | "👱‍♀️"
  | "👱‍♀"
  | "👱🏻‍♂️"
  | "👱🏼‍♂️"
  | "👱🏽‍♂️"
  | "👱🏾‍♂️"
  | "👱🏿‍♂️"
  | "👱‍♂️"
  | "👱‍♂"
  | "🧓🏻"
  | "🧓🏼"
  | "🧓🏽"
  | "🧓🏾"
  | "🧓🏿"
  | "🧓"
  | "👴🏻"
  | "👴🏼"
  | "👴🏽"
  | "👴🏾"
  | "👴🏿"
  | "👴"
  | "👵🏻"
  | "👵🏼"
  | "👵🏽"
  | "👵🏾"
  | "👵🏿"
  | "👵"
  | "🙍🏻"
  | "🙍🏼"
  | "🙍🏽"
  | "🙍🏾"
  | "🙍🏿"
  | "🙍"
  | "🙍🏻‍♂️"
  | "🙍🏼‍♂️"
  | "🙍🏽‍♂️"
  | "🙍🏾‍♂️"
  | "🙍🏿‍♂️"
  | "🙍‍♂️"
  | "🙍‍♂"
  | "🙍🏻‍♀️"
  | "🙍🏼‍♀️"
  | "🙍🏽‍♀️"
  | "🙍🏾‍♀️"
  | "🙍🏿‍♀️"
  | "🙍‍♀️"
  | "🙍‍♀"
  | "🙎🏻"
  | "🙎🏼"
  | "🙎🏽"
  | "🙎🏾"
  | "🙎🏿"
  | "🙎"
  | "🙎🏻‍♂️"
  | "🙎🏼‍♂️"
  | "🙎🏽‍♂️"
  | "🙎🏾‍♂️"
  | "🙎🏿‍♂️"
  | "🙎‍♂️"
  | "🙎‍♂"
  | "🙎🏻‍♀️"
  | "🙎🏼‍♀️"
  | "🙎🏽‍♀️"
  | "🙎🏾‍♀️"
  | "🙎🏿‍♀️"
  | "🙎‍♀️"
  | "🙎‍♀"
  | "🙅🏻"
  | "🙅🏼"
  | "🙅🏽"
  | "🙅🏾"
  | "🙅🏿"
  | "🙅"
  | "🙅🏻‍♂️"
  | "🙅🏼‍♂️"
  | "🙅🏽‍♂️"
  | "🙅🏾‍♂️"
  | "🙅🏿‍♂️"
  | "🙅‍♂️"
  | "🙅‍♂"
  | "🙅🏻‍♀️"
  | "🙅🏼‍♀️"
  | "🙅🏽‍♀️"
  | "🙅🏾‍♀️"
  | "🙅🏿‍♀️"
  | "🙅‍♀️"
  | "🙅‍♀"
  | "🙆🏻"
  | "🙆🏼"
  | "🙆🏽"
  | "🙆🏾"
  | "🙆🏿"
  | "🙆"
  | "🙆🏻‍♂️"
  | "🙆🏼‍♂️"
  | "🙆🏽‍♂️"
  | "🙆🏾‍♂️"
  | "🙆🏿‍♂️"
  | "🙆‍♂️"
  | "🙆‍♂"
  | "🙆🏻‍♀️"
  | "🙆🏼‍♀️"
  | "🙆🏽‍♀️"
  | "🙆🏾‍♀️"
  | "🙆🏿‍♀️"
  | "🙆‍♀️"
  | "🙆‍♀"
  | "💁🏻"
  | "💁🏼"
  | "💁🏽"
  | "💁🏾"
  | "💁🏿"
  | "💁"
  | "💁🏻‍♂️"
  | "💁🏼‍♂️"
  | "💁🏽‍♂️"
  | "💁🏾‍♂️"
  | "💁🏿‍♂️"
  | "💁‍♂️"
  | "💁‍♂"
  | "💁🏻‍♀️"
  | "💁🏼‍♀️"
  | "💁🏽‍♀️"
  | "💁🏾‍♀️"
  | "💁🏿‍♀️"
  | "💁‍♀️"
  | "💁‍♀"
  | "🙋🏻"
  | "🙋🏼"
  | "🙋🏽"
  | "🙋🏾"
  | "🙋🏿"
  | "🙋"
  | "🙋🏻‍♂️"
  | "🙋🏼‍♂️"
  | "🙋🏽‍♂️"
  | "🙋🏾‍♂️"
  | "🙋🏿‍♂️"
  | "🙋‍♂️"
  | "🙋‍♂"
  | "🙋🏻‍♀️"
  | "🙋🏼‍♀️"
  | "🙋🏽‍♀️"
  | "🙋🏾‍♀️"
  | "🙋🏿‍♀️"
  | "🙋‍♀️"
  | "🙋‍♀"
  | "🧏🏻"
  | "🧏🏼"
  | "🧏🏽"
  | "🧏🏾"
  | "🧏🏿"
  | "🧏"
  | "🧏🏻‍♂️"
  | "🧏🏼‍♂️"
  | "🧏🏽‍♂️"
  | "🧏🏾‍♂️"
  | "🧏🏿‍♂️"
  | "🧏‍♂️"
  | "🧏‍♂"
  | "🧏🏻‍♀️"
  | "🧏🏼‍♀️"
  | "🧏🏽‍♀️"
  | "🧏🏾‍♀️"
  | "🧏🏿‍♀️"
  | "🧏‍♀️"
  | "🧏‍♀"
  | "🙇🏻"
  | "🙇🏼"
  | "🙇🏽"
  | "🙇🏾"
  | "🙇🏿"
  | "🙇"
  | "🙇🏻‍♂️"
  | "🙇🏼‍♂️"
  | "🙇🏽‍♂️"
  | "🙇🏾‍♂️"
  | "🙇🏿‍♂️"
  | "🙇‍♂️"
  | "🙇‍♂"
  | "🙇🏻‍♀️"
  | "🙇🏼‍♀️"
  | "🙇🏽‍♀️"
  | "🙇🏾‍♀️"
  | "🙇🏿‍♀️"
  | "🙇‍♀️"
  | "🙇‍♀"
  | "🤦🏻"
  | "🤦🏼"
  | "🤦🏽"
  | "🤦🏾"
  | "🤦🏿"
  | "🤦"
  | "🤦🏻‍♂️"
  | "🤦🏼‍♂️"
  | "🤦🏽‍♂️"
  | "🤦🏾‍♂️"
  | "🤦🏿‍♂️"
  | "🤦‍♂️"
  | "🤦‍♂"
  | "🤦🏻‍♀️"
  | "🤦🏼‍♀️"
  | "🤦🏽‍♀️"
  | "🤦🏾‍♀️"
  | "🤦🏿‍♀️"
  | "🤦‍♀️"
  | "🤦‍♀"
  | "🤷🏻"
  | "🤷🏼"
  | "🤷🏽"
  | "🤷🏾"
  | "🤷🏿"
  | "🤷"
  | "🤷🏻‍♂️"
  | "🤷🏼‍♂️"
  | "🤷🏽‍♂️"
  | "🤷🏾‍♂️"
  | "🤷🏿‍♂️"
  | "🤷‍♂️"
  | "🤷‍♂"
  | "🤷🏻‍♀️"
  | "🤷🏼‍♀️"
  | "🤷🏽‍♀️"
  | "🤷🏾‍♀️"
  | "🤷🏿‍♀️"
  | "🤷‍♀️"
  | "🤷‍♀"
  | "🧑🏻‍⚕️"
  | "🧑🏼‍⚕️"
  | "🧑🏽‍⚕️"
  | "🧑🏾‍⚕️"
  | "🧑🏿‍⚕️"
  | "🧑‍⚕️"
  | "🧑‍⚕"
  | "👨🏻‍⚕️"
  | "👨🏼‍⚕️"
  | "👨🏽‍⚕️"
  | "👨🏾‍⚕️"
  | "👨🏿‍⚕️"
  | "👨‍⚕️"
  | "👨‍⚕"
  | "👩🏻‍⚕️"
  | "👩🏼‍⚕️"
  | "👩🏽‍⚕️"
  | "👩🏾‍⚕️"
  | "👩🏿‍⚕️"
  | "👩‍⚕️"
  | "👩‍⚕"
  | "🧑🏻‍🎓"
  | "🧑🏼‍🎓"
  | "🧑🏽‍🎓"
  | "🧑🏾‍🎓"
  | "🧑🏿‍🎓"
  | "🧑‍🎓"
  | "👨🏻‍🎓"
  | "👨🏼‍🎓"
  | "👨🏽‍🎓"
  | "👨🏾‍🎓"
  | "👨🏿‍🎓"
  | "👨‍🎓"
  | "👩🏻‍🎓"
  | "👩🏼‍🎓"
  | "👩🏽‍🎓"
  | "👩🏾‍🎓"
  | "👩🏿‍🎓"
  | "👩‍🎓"
  | "🧑🏻‍🏫"
  | "🧑🏼‍🏫"
  | "🧑🏽‍🏫"
  | "🧑🏾‍🏫"
  | "🧑🏿‍🏫"
  | "🧑‍🏫"
  | "👨🏻‍🏫"
  | "👨🏼‍🏫"
  | "👨🏽‍🏫"
  | "👨🏾‍🏫"
  | "👨🏿‍🏫"
  | "👨‍🏫"
  | "👩🏻‍🏫"
  | "👩🏼‍🏫"
  | "👩🏽‍🏫"
  | "👩🏾‍🏫"
  | "👩🏿‍🏫"
  | "👩‍🏫"
  | "🧑🏻‍⚖️"
  | "🧑🏼‍⚖️"
  | "🧑🏽‍⚖️"
  | "🧑🏾‍⚖️"
  | "🧑🏿‍⚖️"
  | "🧑‍⚖️"
  | "🧑‍⚖"
  | "👨🏻‍⚖️"
  | "👨🏼‍⚖️"
  | "👨🏽‍⚖️"
  | "👨🏾‍⚖️"
  | "👨🏿‍⚖️"
  | "👨‍⚖️"
  | "👨‍⚖"
  | "👩🏻‍⚖️"
  | "👩🏼‍⚖️"
  | "👩🏽‍⚖️"
  | "👩🏾‍⚖️"
  | "👩🏿‍⚖️"
  | "👩‍⚖️"
  | "👩‍⚖"
  | "🧑🏻‍🌾"
  | "🧑🏼‍🌾"
  | "🧑🏽‍🌾"
  | "🧑🏾‍🌾"
  | "🧑🏿‍🌾"
  | "🧑‍🌾"
  | "👨🏻‍🌾"
  | "👨🏼‍🌾"
  | "👨🏽‍🌾"
  | "👨🏾‍🌾"
  | "👨🏿‍🌾"
  | "👨‍🌾"
  | "👩🏻‍🌾"
  | "👩🏼‍🌾"
  | "👩🏽‍🌾"
  | "👩🏾‍🌾"
  | "👩🏿‍🌾"
  | "👩‍🌾"
  | "🧑🏻‍🍳"
  | "🧑🏼‍🍳"
  | "🧑🏽‍🍳"
  | "🧑🏾‍🍳"
  | "🧑🏿‍🍳"
  | "🧑‍🍳"
  | "👨🏻‍🍳"
  | "👨🏼‍🍳"
  | "👨🏽‍🍳"
  | "👨🏾‍🍳"
  | "👨🏿‍🍳"
  | "👨‍🍳"
  | "👩🏻‍🍳"
  | "👩🏼‍🍳"
  | "👩🏽‍🍳"
  | "👩🏾‍🍳"
  | "👩🏿‍🍳"
  | "👩‍🍳"
  | "🧑🏻‍🔧"
  | "🧑🏼‍🔧"
  | "🧑🏽‍🔧"
  | "🧑🏾‍🔧"
  | "🧑🏿‍🔧"
  | "🧑‍🔧"
  | "👨🏻‍🔧"
  | "👨🏼‍🔧"
  | "👨🏽‍🔧"
  | "👨🏾‍🔧"
  | "👨🏿‍🔧"
  | "👨‍🔧"
  | "👩🏻‍🔧"
  | "👩🏼‍🔧"
  | "👩🏽‍🔧"
  | "👩🏾‍🔧"
  | "👩🏿‍🔧"
  | "👩‍🔧"
  | "🧑🏻‍🏭"
  | "🧑🏼‍🏭"
  | "🧑🏽‍🏭"
  | "🧑🏾‍🏭"
  | "🧑🏿‍🏭"
  | "🧑‍🏭"
  | "👨🏻‍🏭"
  | "👨🏼‍🏭"
  | "👨🏽‍🏭"
  | "👨🏾‍🏭"
  | "👨🏿‍🏭"
  | "👨‍🏭"
  | "👩🏻‍🏭"
  | "👩🏼‍🏭"
  | "👩🏽‍🏭"
  | "👩🏾‍🏭"
  | "👩🏿‍🏭"
  | "👩‍🏭"
  | "🧑🏻‍💼"
  | "🧑🏼‍💼"
  | "🧑🏽‍💼"
  | "🧑🏾‍💼"
  | "🧑🏿‍💼"
  | "🧑‍💼"
  | "👨🏻‍💼"
  | "👨🏼‍💼"
  | "👨🏽‍💼"
  | "👨🏾‍💼"
  | "👨🏿‍💼"
  | "👨‍💼"
  | "👩🏻‍💼"
  | "👩🏼‍💼"
  | "👩🏽‍💼"
  | "👩🏾‍💼"
  | "👩🏿‍💼"
  | "👩‍💼"
  | "🧑🏻‍🔬"
  | "🧑🏼‍🔬"
  | "🧑🏽‍🔬"
  | "🧑🏾‍🔬"
  | "🧑🏿‍🔬"
  | "🧑‍🔬"
  | "👨🏻‍🔬"
  | "👨🏼‍🔬"
  | "👨🏽‍🔬"
  | "👨🏾‍🔬"
  | "👨🏿‍🔬"
  | "👨‍🔬"
  | "👩🏻‍🔬"
  | "👩🏼‍🔬"
  | "👩🏽‍🔬"
  | "👩🏾‍🔬"
  | "👩🏿‍🔬"
  | "👩‍🔬"
  | "🧑🏻‍💻"
  | "🧑🏼‍💻"
  | "🧑🏽‍💻"
  | "🧑🏾‍💻"
  | "🧑🏿‍💻"
  | "🧑‍💻"
  | "👨🏻‍💻"
  | "👨🏼‍💻"
  | "👨🏽‍💻"
  | "👨🏾‍💻"
  | "👨🏿‍💻"
  | "👨‍💻"
  | "👩🏻‍💻"
  | "👩🏼‍💻"
  | "👩🏽‍💻"
  | "👩🏾‍💻"
  | "👩🏿‍💻"
  | "👩‍💻"
  | "🧑🏻‍🎤"
  | "🧑🏼‍🎤"
  | "🧑🏽‍🎤"
  | "🧑🏾‍🎤"
  | "🧑🏿‍🎤"
  | "🧑‍🎤"
  | "👨🏻‍🎤"
  | "👨🏼‍🎤"
  | "👨🏽‍🎤"
  | "👨🏾‍🎤"
  | "👨🏿‍🎤"
  | "👨‍🎤"
  | "👩🏻‍🎤"
  | "👩🏼‍🎤"
  | "👩🏽‍🎤"
  | "👩🏾‍🎤"
  | "👩🏿‍🎤"
  | "👩‍🎤"
  | "🧑🏻‍🎨"
  | "🧑🏼‍🎨"
  | "🧑🏽‍🎨"
  | "🧑🏾‍🎨"
  | "🧑🏿‍🎨"
  | "🧑‍🎨"
  | "👨🏻‍🎨"
  | "👨🏼‍🎨"
  | "👨🏽‍🎨"
  | "👨🏾‍🎨"
  | "👨🏿‍🎨"
  | "👨‍🎨"
  | "👩🏻‍🎨"
  | "👩🏼‍🎨"
  | "👩🏽‍🎨"
  | "👩🏾‍🎨"
  | "👩🏿‍🎨"
  | "👩‍🎨"
  | "🧑🏻‍✈️"
  | "🧑🏼‍✈️"
  | "🧑🏽‍✈️"
  | "🧑🏾‍✈️"
  | "🧑🏿‍✈️"
  | "🧑‍✈️"
  | "🧑‍✈"
  | "👨🏻‍✈️"
  | "👨🏼‍✈️"
  | "👨🏽‍✈️"
  | "👨🏾‍✈️"
  | "👨🏿‍✈️"
  | "👨‍✈️"
  | "👨‍✈"
  | "👩🏻‍✈️"
  | "👩🏼‍✈️"
  | "👩🏽‍✈️"
  | "👩🏾‍✈️"
  | "👩🏿‍✈️"
  | "👩‍✈️"
  | "👩‍✈"
  | "🧑🏻‍🚀"
  | "🧑🏼‍🚀"
  | "🧑🏽‍🚀"
  | "🧑🏾‍🚀"
  | "🧑🏿‍🚀"
  | "🧑‍🚀"
  | "👨🏻‍🚀"
  | "👨🏼‍🚀"
  | "👨🏽‍🚀"
  | "👨🏾‍🚀"
  | "👨🏿‍🚀"
  | "👨‍🚀"
  | "👩🏻‍🚀"
  | "👩🏼‍🚀"
  | "👩🏽‍🚀"
  | "👩🏾‍🚀"
  | "👩🏿‍🚀"
  | "👩‍🚀"
  | "🧑🏻‍🚒"
  | "🧑🏼‍🚒"
  | "🧑🏽‍🚒"
  | "🧑🏾‍🚒"
  | "🧑🏿‍🚒"
  | "🧑‍🚒"
  | "👨🏻‍🚒"
  | "👨🏼‍🚒"
  | "👨🏽‍🚒"
  | "👨🏾‍🚒"
  | "👨🏿‍🚒"
  | "👨‍🚒"
  | "👩🏻‍🚒"
  | "👩🏼‍🚒"
  | "👩🏽‍🚒"
  | "👩🏾‍🚒"
  | "👩🏿‍🚒"
  | "👩‍🚒"
  | "👮🏻"
  | "👮🏼"
  | "👮🏽"
  | "👮🏾"
  | "👮🏿"
  | "👮"
  | "👮🏻‍♂️"
  | "👮🏼‍♂️"
  | "👮🏽‍♂️"
  | "👮🏾‍♂️"
  | "👮🏿‍♂️"
  | "👮‍♂️"
  | "👮‍♂"
  | "👮🏻‍♀️"
  | "👮🏼‍♀️"
  | "👮🏽‍♀️"
  | "👮🏾‍♀️"
  | "👮🏿‍♀️"
  | "👮‍♀️"
  | "👮‍♀"
  | "🕵🏻"
  | "🕵🏼"
  | "🕵🏽"
  | "🕵🏾"
  | "🕵🏿"
  | "🕵️"
  | "🕵"
  | "🕵🏻‍♂️"
  | "🕵🏼‍♂️"
  | "🕵🏽‍♂️"
  | "🕵🏾‍♂️"
  | "🕵🏿‍♂️"
  | "🕵️‍♂️"
  | "🕵🏻‍♀️"
  | "🕵🏼‍♀️"
  | "🕵🏽‍♀️"
  | "🕵🏾‍♀️"
  | "🕵🏿‍♀️"
  | "🕵️‍♀️"
  | "💂🏻"
  | "💂🏼"
  | "💂🏽"
  | "💂🏾"
  | "💂🏿"
  | "💂"
  | "💂🏻‍♂️"
  | "💂🏼‍♂️"
  | "💂🏽‍♂️"
  | "💂🏾‍♂️"
  | "💂🏿‍♂️"
  | "💂‍♂️"
  | "💂‍♂"
  | "💂🏻‍♀️"
  | "💂🏼‍♀️"
  | "💂🏽‍♀️"
  | "💂🏾‍♀️"
  | "💂🏿‍♀️"
  | "💂‍♀️"
  | "💂‍♀"
  | "🥷🏻"
  | "🥷🏼"
  | "🥷🏽"
  | "🥷🏾"
  | "🥷🏿"
  | "🥷"
  | "👷🏻"
  | "👷🏼"
  | "👷🏽"
  | "👷🏾"
  | "👷🏿"
  | "👷"
  | "👷🏻‍♂️"
  | "👷🏼‍♂️"
  | "👷🏽‍♂️"
  | "👷🏾‍♂️"
  | "👷🏿‍♂️"
  | "👷‍♂️"
  | "👷‍♂"
  | "👷🏻‍♀️"
  | "👷🏼‍♀️"
  | "👷🏽‍♀️"
  | "👷🏾‍♀️"
  | "👷🏿‍♀️"
  | "👷‍♀️"
  | "👷‍♀"
  | "🫅🏻"
  | "🫅🏼"
  | "🫅🏽"
  | "🫅🏾"
  | "🫅🏿"
  | "🫅"
  | "🤴🏻"
  | "🤴🏼"
  | "🤴🏽"
  | "🤴🏾"
  | "🤴🏿"
  | "🤴"
  | "👸🏻"
  | "👸🏼"
  | "👸🏽"
  | "👸🏾"
  | "👸🏿"
  | "👸"
  | "👳🏻"
  | "👳🏼"
  | "👳🏽"
  | "👳🏾"
  | "👳🏿"
  | "👳"
  | "👳🏻‍♂️"
  | "👳🏼‍♂️"
  | "👳🏽‍♂️"
  | "👳🏾‍♂️"
  | "👳🏿‍♂️"
  | "👳‍♂️"
  | "👳‍♂"
  | "👳🏻‍♀️"
  | "👳🏼‍♀️"
  | "👳🏽‍♀️"
  | "👳🏾‍♀️"
  | "👳🏿‍♀️"
  | "👳‍♀️"
  | "👳‍♀"
  | "👲🏻"
  | "👲🏼"
  | "👲🏽"
  | "👲🏾"
  | "👲🏿"
  | "👲"
  | "🧕🏻"
  | "🧕🏼"
  | "🧕🏽"
  | "🧕🏾"
  | "🧕🏿"
  | "🧕"
  | "🤵🏻"
  | "🤵🏼"
  | "🤵🏽"
  | "🤵🏾"
  | "🤵🏿"
  | "🤵"
  | "🤵🏻‍♂️"
  | "🤵🏼‍♂️"
  | "🤵🏽‍♂️"
  | "🤵🏾‍♂️"
  | "🤵🏿‍♂️"
  | "🤵‍♂️"
  | "🤵‍♂"
  | "🤵🏻‍♀️"
  | "🤵🏼‍♀️"
  | "🤵🏽‍♀️"
  | "🤵🏾‍♀️"
  | "🤵🏿‍♀️"
  | "🤵‍♀️"
  | "🤵‍♀"
  | "👰🏻"
  | "👰🏼"
  | "👰🏽"
  | "👰🏾"
  | "👰🏿"
  | "👰"
  | "👰🏻‍♂️"
  | "👰🏼‍♂️"
  | "👰🏽‍♂️"
  | "👰🏾‍♂️"
  | "👰🏿‍♂️"
  | "👰‍♂️"
  | "👰‍♂"
  | "👰🏻‍♀️"
  | "👰🏼‍♀️"
  | "👰🏽‍♀️"
  | "👰🏾‍♀️"
  | "👰🏿‍♀️"
  | "👰‍♀️"
  | "👰‍♀"
  | "🤰🏻"
  | "🤰🏼"
  | "🤰🏽"
  | "🤰🏾"
  | "🤰🏿"
  | "🤰"
  | "🫃🏻"
  | "🫃🏼"
  | "🫃🏽"
  | "🫃🏾"
  | "🫃🏿"
  | "🫃"
  | "🫄🏻"
  | "🫄🏼"
  | "🫄🏽"
  | "🫄🏾"
  | "🫄🏿"
  | "🫄"
  | "🤱🏻"
  | "🤱🏼"
  | "🤱🏽"
  | "🤱🏾"
  | "🤱🏿"
  | "🤱"
  | "👩🏻‍🍼"
  | "👩🏼‍🍼"
  | "👩🏽‍🍼"
  | "👩🏾‍🍼"
  | "👩🏿‍🍼"
  | "👩‍🍼"
  | "👨🏻‍🍼"
  | "👨🏼‍🍼"
  | "👨🏽‍🍼"
  | "👨🏾‍🍼"
  | "👨🏿‍🍼"
  | "👨‍🍼"
  | "🧑🏻‍🍼"
  | "🧑🏼‍🍼"
  | "🧑🏽‍🍼"
  | "🧑🏾‍🍼"
  | "🧑🏿‍🍼"
  | "🧑‍🍼"
  | "👼🏻"
  | "👼🏼"
  | "👼🏽"
  | "👼🏾"
  | "👼🏿"
  | "👼"
  | "🎅🏻"
  | "🎅🏼"
  | "🎅🏽"
  | "🎅🏾"
  | "🎅🏿"
  | "🎅"
  | "🤶🏻"
  | "🤶🏼"
  | "🤶🏽"
  | "🤶🏾"
  | "🤶🏿"
  | "🤶"
  | "🧑🏻‍🎄"
  | "🧑🏼‍🎄"
  | "🧑🏽‍🎄"
  | "🧑🏾‍🎄"
  | "🧑🏿‍🎄"
  | "🧑‍🎄"
  | "🦸🏻"
  | "🦸🏼"
  | "🦸🏽"
  | "🦸🏾"
  | "🦸🏿"
  | "🦸"
  | "🦸🏻‍♂️"
  | "🦸🏼‍♂️"
  | "🦸🏽‍♂️"
  | "🦸🏾‍♂️"
  | "🦸🏿‍♂️"
  | "🦸‍♂️"
  | "🦸‍♂"
  | "🦸🏻‍♀️"
  | "🦸🏼‍♀️"
  | "🦸🏽‍♀️"
  | "🦸🏾‍♀️"
  | "🦸🏿‍♀️"
  | "🦸‍♀️"
  | "🦸‍♀"
  | "🦹🏻"
  | "🦹🏼"
  | "🦹🏽"
  | "🦹🏾"
  | "🦹🏿"
  | "🦹"
  | "🦹🏻‍♂️"
  | "🦹🏼‍♂️"
  | "🦹🏽‍♂️"
  | "🦹🏾‍♂️"
  | "🦹🏿‍♂️"
  | "🦹‍♂️"
  | "🦹‍♂"
  | "🦹🏻‍♀️"
  | "🦹🏼‍♀️"
  | "🦹🏽‍♀️"
  | "🦹🏾‍♀️"
  | "🦹🏿‍♀️"
  | "🦹‍♀️"
  | "🦹‍♀"
  | "🧙🏻"
  | "🧙🏼"
  | "🧙🏽"
  | "🧙🏾"
  | "🧙🏿"
  | "🧙"
  | "🧙🏻‍♂️"
  | "🧙🏼‍♂️"
  | "🧙🏽‍♂️"
  | "🧙🏾‍♂️"
  | "🧙🏿‍♂️"
  | "🧙‍♂️"
  | "🧙‍♂"
  | "🧙🏻‍♀️"
  | "🧙🏼‍♀️"
  | "🧙🏽‍♀️"
  | "🧙🏾‍♀️"
  | "🧙🏿‍♀️"
  | "🧙‍♀️"
  | "🧙‍♀"
  | "🧚🏻"
  | "🧚🏼"
  | "🧚🏽"
  | "🧚🏾"
  | "🧚🏿"
  | "🧚"
  | "🧚🏻‍♂️"
  | "🧚🏼‍♂️"
  | "🧚🏽‍♂️"
  | "🧚🏾‍♂️"
  | "🧚🏿‍♂️"
  | "🧚‍♂️"
  | "🧚‍♂"
  | "🧚🏻‍♀️"
  | "🧚🏼‍♀️"
  | "🧚🏽‍♀️"
  | "🧚🏾‍♀️"
  | "🧚🏿‍♀️"
  | "🧚‍♀️"
  | "🧚‍♀"
  | "🧛🏻"
  | "🧛🏼"
  | "🧛🏽"
  | "🧛🏾"
  | "🧛🏿"
  | "🧛"
  | "🧛🏻‍♂️"
  | "🧛🏼‍♂️"
  | "🧛🏽‍♂️"
  | "🧛🏾‍♂️"
  | "🧛🏿‍♂️"
  | "🧛‍♂️"
  | "🧛‍♂"
  | "🧛🏻‍♀️"
  | "🧛🏼‍♀️"
  | "🧛🏽‍♀️"
  | "🧛🏾‍♀️"
  | "🧛🏿‍♀️"
  | "🧛‍♀️"
  | "🧛‍♀"
  | "🧜🏻"
  | "🧜🏼"
  | "🧜🏽"
  | "🧜🏾"
  | "🧜🏿"
  | "🧜"
  | "🧜🏻‍♂️"
  | "🧜🏼‍♂️"
  | "🧜🏽‍♂️"
  | "🧜🏾‍♂️"
  | "🧜🏿‍♂️"
  | "🧜‍♂️"
  | "🧜‍♂"
  | "🧜🏻‍♀️"
  | "🧜🏼‍♀️"
  | "🧜🏽‍♀️"
  | "🧜🏾‍♀️"
  | "🧜🏿‍♀️"
  | "🧜‍♀️"
  | "🧜‍♀"
  | "🧝🏻"
  | "🧝🏼"
  | "🧝🏽"
  | "🧝🏾"
  | "🧝🏿"
  | "🧝"
  | "🧝🏻‍♂️"
  | "🧝🏼‍♂️"
  | "🧝🏽‍♂️"
  | "🧝🏾‍♂️"
  | "🧝🏿‍♂️"
  | "🧝‍♂️"
  | "🧝‍♂"
  | "🧝🏻‍♀️"
  | "🧝🏼‍♀️"
  | "🧝🏽‍♀️"
  | "🧝🏾‍♀️"
  | "🧝🏿‍♀️"
  | "🧝‍♀️"
  | "🧝‍♀"
  | "🧞"
  | "🧞‍♂️"
  | "🧞‍♂"
  | "🧞‍♀️"
  | "🧞‍♀"
  | "🧟"
  | "🧟‍♂️"
  | "🧟‍♂"
  | "🧟‍♀️"
  | "🧟‍♀"
  | "🧌"
  | "💆🏻"
  | "💆🏼"
  | "💆🏽"
  | "💆🏾"
  | "💆🏿"
  | "💆"
  | "💆🏻‍♂️"
  | "💆🏼‍♂️"
  | "💆🏽‍♂️"
  | "💆🏾‍♂️"
  | "💆🏿‍♂️"
  | "💆‍♂️"
  | "💆‍♂"
  | "💆🏻‍♀️"
  | "💆🏼‍♀️"
  | "💆🏽‍♀️"
  | "💆🏾‍♀️"
  | "💆🏿‍♀️"
  | "💆‍♀️"
  | "💆‍♀"
  | "💇🏻"
  | "💇🏼"
  | "💇🏽"
  | "💇🏾"
  | "💇🏿"
  | "💇"
  | "💇🏻‍♂️"
  | "💇🏼‍♂️"
  | "💇🏽‍♂️"
  | "💇🏾‍♂️"
  | "💇🏿‍♂️"
  | "💇‍♂️"
  | "💇‍♂"
  | "💇🏻‍♀️"
  | "💇🏼‍♀️"
  | "💇🏽‍♀️"
  | "💇🏾‍♀️"
  | "💇🏿‍♀️"
  | "💇‍♀️"
  | "💇‍♀"
  | "🚶🏻"
  | "🚶🏼"
  | "🚶🏽"
  | "🚶🏾"
  | "🚶🏿"
  | "🚶"
  | "🚶🏻‍♂️"
  | "🚶🏼‍♂️"
  | "🚶🏽‍♂️"
  | "🚶🏾‍♂️"
  | "🚶🏿‍♂️"
  | "🚶‍♂️"
  | "🚶‍♂"
  | "🚶🏻‍♀️"
  | "🚶🏼‍♀️"
  | "🚶🏽‍♀️"
  | "🚶🏾‍♀️"
  | "🚶🏿‍♀️"
  | "🚶‍♀️"
  | "🚶‍♀"
  | "🧍🏻"
  | "🧍🏼"
  | "🧍🏽"
  | "🧍🏾"
  | "🧍🏿"
  | "🧍"
  | "🧍🏻‍♂️"
  | "🧍🏼‍♂️"
  | "🧍🏽‍♂️"
  | "🧍🏾‍♂️"
  | "🧍🏿‍♂️"
  | "🧍‍♂️"
  | "🧍‍♂"
  | "🧍🏻‍♀️"
  | "🧍🏼‍♀️"
  | "🧍🏽‍♀️"
  | "🧍🏾‍♀️"
  | "🧍🏿‍♀️"
  | "🧍‍♀️"
  | "🧍‍♀"
  | "🧎🏻"
  | "🧎🏼"
  | "🧎🏽"
  | "🧎🏾"
  | "🧎🏿"
  | "🧎"
  | "🧎🏻‍♂️"
  | "🧎🏼‍♂️"
  | "🧎🏽‍♂️"
  | "🧎🏾‍♂️"
  | "🧎🏿‍♂️"
  | "🧎‍♂️"
  | "🧎‍♂"
  | "🧎🏻‍♀️"
  | "🧎🏼‍♀️"
  | "🧎🏽‍♀️"
  | "🧎🏾‍♀️"
  | "🧎🏿‍♀️"
  | "🧎‍♀️"
  | "🧎‍♀"
  | "🧑🏻‍🦯"
  | "🧑🏼‍🦯"
  | "🧑🏽‍🦯"
  | "🧑🏾‍🦯"
  | "🧑🏿‍🦯"
  | "🧑‍🦯"
  | "👨🏻‍🦯"
  | "👨🏼‍🦯"
  | "👨🏽‍🦯"
  | "👨🏾‍🦯"
  | "👨🏿‍🦯"
  | "👨‍🦯"
  | "👩🏻‍🦯"
  | "👩🏼‍🦯"
  | "👩🏽‍🦯"
  | "👩🏾‍🦯"
  | "👩🏿‍🦯"
  | "👩‍🦯"
  | "🧑🏻‍🦼"
  | "🧑🏼‍🦼"
  | "🧑🏽‍🦼"
  | "🧑🏾‍🦼"
  | "🧑🏿‍🦼"
  | "🧑‍🦼"
  | "👨🏻‍🦼"
  | "👨🏼‍🦼"
  | "👨🏽‍🦼"
  | "👨🏾‍🦼"
  | "👨🏿‍🦼"
  | "👨‍🦼"
  | "👩🏻‍🦼"
  | "👩🏼‍🦼"
  | "👩🏽‍🦼"
  | "👩🏾‍🦼"
  | "👩🏿‍🦼"
  | "👩‍🦼"
  | "🧑🏻‍🦽"
  | "🧑🏼‍🦽"
  | "🧑🏽‍🦽"
  | "🧑🏾‍🦽"
  | "🧑🏿‍🦽"
  | "🧑‍🦽"
  | "👨🏻‍🦽"
  | "👨🏼‍🦽"
  | "👨🏽‍🦽"
  | "👨🏾‍🦽"
  | "👨🏿‍🦽"
  | "👨‍🦽"
  | "👩🏻‍🦽"
  | "👩🏼‍🦽"
  | "👩🏽‍🦽"
  | "👩🏾‍🦽"
  | "👩🏿‍🦽"
  | "👩‍🦽"
  | "🏃🏻"
  | "🏃🏼"
  | "🏃🏽"
  | "🏃🏾"
  | "🏃🏿"
  | "🏃"
  | "🏃🏻‍♂️"
  | "🏃🏼‍♂️"
  | "🏃🏽‍♂️"
  | "🏃🏾‍♂️"
  | "🏃🏿‍♂️"
  | "🏃‍♂️"
  | "🏃‍♂"
  | "🏃🏻‍♀️"
  | "🏃🏼‍♀️"
  | "🏃🏽‍♀️"
  | "🏃🏾‍♀️"
  | "🏃🏿‍♀️"
  | "🏃‍♀️"
  | "🏃‍♀"
  | "💃🏻"
  | "💃🏼"
  | "💃🏽"
  | "💃🏾"
  | "💃🏿"
  | "💃"
  | "🕺🏻"
  | "🕺🏼"
  | "🕺🏽"
  | "🕺🏾"
  | "🕺🏿"
  | "🕺"
  | "🕴🏻"
  | "🕴🏼"
  | "🕴🏽"
  | "🕴🏾"
  | "🕴🏿"
  | "🕴️"
  | "🕴"
  | "👯"
  | "👯‍♂️"
  | "👯‍♂"
  | "👯‍♀️"
  | "👯‍♀"
  | "🧖🏻"
  | "🧖🏼"
  | "🧖🏽"
  | "🧖🏾"
  | "🧖🏿"
  | "🧖"
  | "🧖🏻‍♂️"
  | "🧖🏼‍♂️"
  | "🧖🏽‍♂️"
  | "🧖🏾‍♂️"
  | "🧖🏿‍♂️"
  | "🧖‍♂️"
  | "🧖‍♂"
  | "🧖🏻‍♀️"
  | "🧖🏼‍♀️"
  | "🧖🏽‍♀️"
  | "🧖🏾‍♀️"
  | "🧖🏿‍♀️"
  | "🧖‍♀️"
  | "🧖‍♀"
  | "🧗🏻"
  | "🧗🏼"
  | "🧗🏽"
  | "🧗🏾"
  | "🧗🏿"
  | "🧗"
  | "🧗🏻‍♂️"
  | "🧗🏼‍♂️"
  | "🧗🏽‍♂️"
  | "🧗🏾‍♂️"
  | "🧗🏿‍♂️"
  | "🧗‍♂️"
  | "🧗‍♂"
  | "🧗🏻‍♀️"
  | "🧗🏼‍♀️"
  | "🧗🏽‍♀️"
  | "🧗🏾‍♀️"
  | "🧗🏿‍♀️"
  | "🧗‍♀️"
  | "🧗‍♀"
  | "🤺"
  | "🏇🏻"
  | "🏇🏼"
  | "🏇🏽"
  | "🏇🏾"
  | "🏇🏿"
  | "🏇"
  | "⛷️"
  | "⛷"
  | "🏂🏻"
  | "🏂🏼"
  | "🏂🏽"
  | "🏂🏾"
  | "🏂🏿"
  | "🏂"
  | "🏌🏻"
  | "🏌🏼"
  | "🏌🏽"
  | "🏌🏾"
  | "🏌🏿"
  | "🏌️"
  | "🏌"
  | "🏌🏻‍♂️"
  | "🏌🏼‍♂️"
  | "🏌🏽‍♂️"
  | "🏌🏾‍♂️"
  | "🏌🏿‍♂️"
  | "🏌️‍♂️"
  | "🏌🏻‍♀️"
  | "🏌🏼‍♀️"
  | "🏌🏽‍♀️"
  | "🏌🏾‍♀️"
  | "🏌🏿‍♀️"
  | "🏌️‍♀️"
  | "🏄🏻"
  | "🏄🏼"
  | "🏄🏽"
  | "🏄🏾"
  | "🏄🏿"
  | "🏄"
  | "🏄🏻‍♂️"
  | "🏄🏼‍♂️"
  | "🏄🏽‍♂️"
  | "🏄🏾‍♂️"
  | "🏄🏿‍♂️"
  | "🏄‍♂️"
  | "🏄‍♂"
  | "🏄🏻‍♀️"
  | "🏄🏼‍♀️"
  | "🏄🏽‍♀️"
  | "🏄🏾‍♀️"
  | "🏄🏿‍♀️"
  | "🏄‍♀️"
  | "🏄‍♀"
  | "🚣🏻"
  | "🚣🏼"
  | "🚣🏽"
  | "🚣🏾"
  | "🚣🏿"
  | "🚣"
  | "🚣🏻‍♂️"
  | "🚣🏼‍♂️"
  | "🚣🏽‍♂️"
  | "🚣🏾‍♂️"
  | "🚣🏿‍♂️"
  | "🚣‍♂️"
  | "🚣‍♂"
  | "🚣🏻‍♀️"
  | "🚣🏼‍♀️"
  | "🚣🏽‍♀️"
  | "🚣🏾‍♀️"
  | "🚣🏿‍♀️"
  | "🚣‍♀️"
  | "🚣‍♀"
  | "🏊🏻"
  | "🏊🏼"
  | "🏊🏽"
  | "🏊🏾"
  | "🏊🏿"
  | "🏊"
  | "🏊🏻‍♂️"
  | "🏊🏼‍♂️"
  | "🏊🏽‍♂️"
  | "🏊🏾‍♂️"
  | "🏊🏿‍♂️"
  | "🏊‍♂️"
  | "🏊‍♂"
  | "🏊🏻‍♀️"
  | "🏊🏼‍♀️"
  | "🏊🏽‍♀️"
  | "🏊🏾‍♀️"
  | "🏊🏿‍♀️"
  | "🏊‍♀️"
  | "🏊‍♀"
  | "⛹🏻"
  | "⛹🏼"
  | "⛹🏽"
  | "⛹🏾"
  | "⛹🏿"
  | "⛹️"
  | "⛹"
  | "⛹🏻‍♂️"
  | "⛹🏼‍♂️"
  | "⛹🏽‍♂️"
  | "⛹🏾‍♂️"
  | "⛹🏿‍♂️"
  | "⛹️‍♂️"
  | "⛹🏻‍♀️"
  | "⛹🏼‍♀️"
  | "⛹🏽‍♀️"
  | "⛹🏾‍♀️"
  | "⛹🏿‍♀️"
  | "⛹️‍♀️"
  | "🏋🏻"
  | "🏋🏼"
  | "🏋🏽"
  | "🏋🏾"
  | "🏋🏿"
  | "🏋️"
  | "🏋"
  | "🏋🏻‍♂️"
  | "🏋🏼‍♂️"
  | "🏋🏽‍♂️"
  | "🏋🏾‍♂️"
  | "🏋🏿‍♂️"
  | "🏋️‍♂️"
  | "🏋🏻‍♀️"
  | "🏋🏼‍♀️"
  | "🏋🏽‍♀️"
  | "🏋🏾‍♀️"
  | "🏋🏿‍♀️"
  | "🏋️‍♀️"
  | "🚴🏻"
  | "🚴🏼"
  | "🚴🏽"
  | "🚴🏾"
  | "🚴🏿"
  | "🚴"
  | "🚴🏻‍♂️"
  | "🚴🏼‍♂️"
  | "🚴🏽‍♂️"
  | "🚴🏾‍♂️"
  | "🚴🏿‍♂️"
  | "🚴‍♂️"
  | "🚴‍♂"
  | "🚴🏻‍♀️"
  | "🚴🏼‍♀️"
  | "🚴🏽‍♀️"
  | "🚴🏾‍♀️"
  | "🚴🏿‍♀️"
  | "🚴‍♀️"
  | "🚴‍♀"
  | "🚵🏻"
  | "🚵🏼"
  | "🚵🏽"
  | "🚵🏾"
  | "🚵🏿"
  | "🚵"
  | "🚵🏻‍♂️"
  | "🚵🏼‍♂️"
  | "🚵🏽‍♂️"
  | "🚵🏾‍♂️"
  | "🚵🏿‍♂️"
  | "🚵‍♂️"
  | "🚵‍♂"
  | "🚵🏻‍♀️"
  | "🚵🏼‍♀️"
  | "🚵🏽‍♀️"
  | "🚵🏾‍♀️"
  | "🚵🏿‍♀️"
  | "🚵‍♀️"
  | "🚵‍♀"
  | "🤸🏻"
  | "🤸🏼"
  | "🤸🏽"
  | "🤸🏾"
  | "🤸🏿"
  | "🤸"
  | "🤸🏻‍♂️"
  | "🤸🏼‍♂️"
  | "🤸🏽‍♂️"
  | "🤸🏾‍♂️"
  | "🤸🏿‍♂️"
  | "🤸‍♂️"
  | "🤸‍♂"
  | "🤸🏻‍♀️"
  | "🤸🏼‍♀️"
  | "🤸🏽‍♀️"
  | "🤸🏾‍♀️"
  | "🤸🏿‍♀️"
  | "🤸‍♀️"
  | "🤸‍♀"
  | "🤼"
  | "🤼‍♂️"
  | "🤼‍♂"
  | "🤼‍♀️"
  | "🤼‍♀"
  | "🤽🏻"
  | "🤽🏼"
  | "🤽🏽"
  | "🤽🏾"
  | "🤽🏿"
  | "🤽"
  | "🤽🏻‍♂️"
  | "🤽🏼‍♂️"
  | "🤽🏽‍♂️"
  | "🤽🏾‍♂️"
  | "🤽🏿‍♂️"
  | "🤽‍♂️"
  | "🤽‍♂"
  | "🤽🏻‍♀️"
  | "🤽🏼‍♀️"
  | "🤽🏽‍♀️"
  | "🤽🏾‍♀️"
  | "🤽🏿‍♀️"
  | "🤽‍♀️"
  | "🤽‍♀"
  | "🤾🏻"
  | "🤾🏼"
  | "🤾🏽"
  | "🤾🏾"
  | "🤾🏿"
  | "🤾"
  | "🤾🏻‍♂️"
  | "🤾🏼‍♂️"
  | "🤾🏽‍♂️"
  | "🤾🏾‍♂️"
  | "🤾🏿‍♂️"
  | "🤾‍♂️"
  | "🤾‍♂"
  | "🤾🏻‍♀️"
  | "🤾🏼‍♀️"
  | "🤾🏽‍♀️"
  | "🤾🏾‍♀️"
  | "🤾🏿‍♀️"
  | "🤾‍♀️"
  | "🤾‍♀"
  | "🤹🏻"
  | "🤹🏼"
  | "🤹🏽"
  | "🤹🏾"
  | "🤹🏿"
  | "🤹"
  | "🤹🏻‍♂️"
  | "🤹🏼‍♂️"
  | "🤹🏽‍♂️"
  | "🤹🏾‍♂️"
  | "🤹🏿‍♂️"
  | "🤹‍♂️"
  | "🤹‍♂"
  | "🤹🏻‍♀️"
  | "🤹🏼‍♀️"
  | "🤹🏽‍♀️"
  | "🤹🏾‍♀️"
  | "🤹🏿‍♀️"
  | "🤹‍♀️"
  | "🤹‍♀"
  | "🧘🏻"
  | "🧘🏼"
  | "🧘🏽"
  | "🧘🏾"
  | "🧘🏿"
  | "🧘"
  | "🧘🏻‍♂️"
  | "🧘🏼‍♂️"
  | "🧘🏽‍♂️"
  | "🧘🏾‍♂️"
  | "🧘🏿‍♂️"
  | "🧘‍♂️"
  | "🧘‍♂"
  | "🧘🏻‍♀️"
  | "🧘🏼‍♀️"
  | "🧘🏽‍♀️"
  | "🧘🏾‍♀️"
  | "🧘🏿‍♀️"
  | "🧘‍♀️"
  | "🧘‍♀"
  | "🛀🏻"
  | "🛀🏼"
  | "🛀🏽"
  | "🛀🏾"
  | "🛀🏿"
  | "🛀"
  | "🛌🏻"
  | "🛌🏼"
  | "🛌🏽"
  | "🛌🏾"
  | "🛌🏿"
  | "🛌"
  | "🧑🏻‍🤝‍🧑🏻"
  | "🧑🏻‍🤝‍🧑🏼"
  | "🧑🏻‍🤝‍🧑🏽"
  | "🧑🏻‍🤝‍🧑🏾"
  | "🧑🏻‍🤝‍🧑🏿"
  | "🧑🏼‍🤝‍🧑🏻"
  | "🧑🏼‍🤝‍🧑🏼"
  | "🧑🏼‍🤝‍🧑🏽"
  | "🧑🏼‍🤝‍🧑🏾"
  | "🧑🏼‍🤝‍🧑🏿"
  | "🧑🏽‍🤝‍🧑🏻"
  | "🧑🏽‍🤝‍🧑🏼"
  | "🧑🏽‍🤝‍🧑🏽"
  | "🧑🏽‍🤝‍🧑🏾"
  | "🧑🏽‍🤝‍🧑🏿"
  | "🧑🏾‍🤝‍🧑🏻"
  | "🧑🏾‍🤝‍🧑🏼"
  | "🧑🏾‍🤝‍🧑🏽"
  | "🧑🏾‍🤝‍🧑🏾"
  | "🧑🏾‍🤝‍🧑🏿"
  | "🧑🏿‍🤝‍🧑🏻"
  | "🧑🏿‍🤝‍🧑🏼"
  | "🧑🏿‍🤝‍🧑🏽"
  | "🧑🏿‍🤝‍🧑🏾"
  | "🧑🏿‍🤝‍🧑🏿"
  | "🧑‍🤝‍🧑"
  | "👭"
  | "👫"
  | "👬"
  | "💏"
  | "💑"
  | "👪"
  | "👨‍👩‍👦"
  | "👨‍👩‍👧"
  | "👨‍👩‍👧‍👦"
  | "👨‍👩‍👦‍👦"
  | "👨‍👩‍👧‍👧"
  | "👨‍👨‍👦"
  | "👨‍👨‍👧"
  | "👨‍👨‍👧‍👦"
  | "👨‍👨‍👦‍👦"
  | "👨‍👨‍👧‍👧"
  | "👩‍👩‍👦"
  | "👩‍👩‍👧"
  | "👩‍👩‍👧‍👦"
  | "👩‍👩‍👦‍👦"
  | "👩‍👩‍👧‍👧"
  | "👨‍👦"
  | "👨‍👦‍👦"
  | "👨‍👧"
  | "👨‍👧‍👦"
  | "👨‍👧‍👧"
  | "👩‍👦"
  | "👩‍👦‍👦"
  | "👩‍👧"
  | "👩‍👧‍👦"
  | "👩‍👧‍👧"
  | "🗣️"
  | "🗣"
  | "👤"
  | "👥"
  | "🫂"
  | "👣"
  | "🐵"
  | "🐒"
  | "🦍"
  | "🦧"
  | "🐶"
  | "🐕"
  | "🦮"
  | "🐕‍🦺"
  | "🐩"
  | "🐺"
  | "🦊"
  | "🦝"
  | "🐱"
  | "🐈"
  | "🐈‍⬛"
  | "🦁"
  | "🐯"
  | "🐅"
  | "🐆"
  | "🐴"
  | "🐎"
  | "🦄"
  | "🦓"
  | "🦌"
  | "🦬"
  | "🐮"
  | "🐂"
  | "🐃"
  | "🐄"
  | "🐷"
  | "🐖"
  | "🐗"
  | "🐽"
  | "🐏"
  | "🐑"
  | "🐐"
  | "🐪"
  | "🐫"
  | "🦙"
  | "🦒"
  | "🐘"
  | "🦣"
  | "🦏"
  | "🦛"
  | "🐭"
  | "🐁"
  | "🐀"
  | "🐹"
  | "🐰"
  | "🐇"
  | "🐿️"
  | "🐿"
  | "🦫"
  | "🦔"
  | "🦇"
  | "🐻"
  | "🐻‍❄️"
  | "🐻‍❄"
  | "🐨"
  | "🐼"
  | "🦥"
  | "🦦"
  | "🦨"
  | "🦘"
  | "🦡"
  | "🐾"
  | "🦃"
  | "🐔"
  | "🐓"
  | "🐣"
  | "🐤"
  | "🐥"
  | "🐦"
  | "🐧"
  | "🕊️"
  | "🕊"
  | "🦅"
  | "🦆"
  | "🦢"
  | "🦉"
  | "🦤"
  | "🪶"
  | "🦩"
  | "🦚"
  | "🦜"
  | "🐸"
  | "🐊"
  | "🐢"
  | "🦎"
  | "🐍"
  | "🐲"
  | "🐉"
  | "🦕"
  | "🦖"
  | "🐳"
  | "🐋"
  | "🐬"
  | "🦭"
  | "🐟"
  | "🐠"
  | "🐡"
  | "🦈"
  | "🐙"
  | "🐚"
  | "🪸"
  | "🐌"
  | "🦋"
  | "🐛"
  | "🐜"
  | "🐝"
  | "🪲"
  | "🐞"
  | "🦗"
  | "🪳"
  | "🕷️"
  | "🕷"
  | "🕸️"
  | "🕸"
  | "🦂"
  | "🦟"
  | "🪰"
  | "🪱"
  | "🦠"
  | "💐"
  | "🌸"
  | "💮"
  | "🪷"
  | "🏵️"
  | "🏵"
  | "🌹"
  | "🥀"
  | "🌺"
  | "🌻"
  | "🌼"
  | "🌷"
  | "🌱"
  | "🪴"
  | "🌲"
  | "🌳"
  | "🌴"
  | "🌵"
  | "🌾"
  | "🌿"
  | "☘️"
  | "☘"
  | "🍀"
  | "🍁"
  | "🍂"
  | "🍃"
  | "🪹"
  | "🪺"
  | "🍇"
  | "🍈"
  | "🍉"
  | "🍊"
  | "🍋"
  | "🍌"
  | "🍍"
  | "🥭"
  | "🍎"
  | "🍏"
  | "🍐"
  | "🍑"
  | "🍒"
  | "🍓"
  | "🫐"
  | "🥝"
  | "🍅"
  | "🫒"
  | "🥥"
  | "🥑"
  | "🍆"
  | "🥔"
  | "🥕"
  | "🌽"
  | "🌶️"
  | "🌶"
  | "🫑"
  | "🥒"
  | "🥬"
  | "🥦"
  | "🧄"
  | "🧅"
  | "🍄"
  | "🥜"
  | "🫘"
  | "🌰"
  | "🍞"
  | "🥐"
  | "🥖"
  | "🫓"
  | "🥨"
  | "🥯"
  | "🥞"
  | "🧇"
  | "🧀"
  | "🍖"
  | "🍗"
  | "🥩"
  | "🥓"
  | "🍔"
  | "🍟"
  | "🍕"
  | "🌭"
  | "🥪"
  | "🌮"
  | "🌯"
  | "🫔"
  | "🥙"
  | "🧆"
  | "🥚"
  | "🍳"
  | "🥘"
  | "🍲"
  | "🫕"
  | "🥣"
  | "🥗"
  | "🍿"
  | "🧈"
  | "🧂"
  | "🥫"
  | "🍱"
  | "🍘"
  | "🍙"
  | "🍚"
  | "🍛"
  | "🍜"
  | "🍝"
  | "🍠"
  | "🍢"
  | "🍣"
  | "🍤"
  | "🍥"
  | "🥮"
  | "🍡"
  | "🥟"
  | "🥠"
  | "🥡"
  | "🦀"
  | "🦞"
  | "🦐"
  | "🦑"
  | "🦪"
  | "🍦"
  | "🍧"
  | "🍨"
  | "🍩"
  | "🍪"
  | "🎂"
  | "🍰"
  | "🧁"
  | "🥧"
  | "🍫"
  | "🍬"
  | "🍭"
  | "🍮"
  | "🍯"
  | "🍼"
  | "🥛"
  | "☕"
  | "🫖"
  | "🍵"
  | "🍶"
  | "🍾"
  | "🍷"
  | "🍸"
  | "🍹"
  | "🍺"
  | "🍻"
  | "🥂"
  | "🥃"
  | "🫗"
  | "🥤"
  | "🧋"
  | "🧃"
  | "🧉"
  | "🧊"
  | "🥢"
  | "🍽️"
  | "🍽"
  | "🍴"
  | "🥄"
  | "🔪"
  | "🫙"
  | "🏺"
  | "🌍"
  | "🌎"
  | "🌏"
  | "🌐"
  | "🗺️"
  | "🗺"
  | "🗾"
  | "🧭"
  | "🏔️"
  | "🏔"
  | "⛰️"
  | "⛰"
  | "🌋"
  | "🗻"
  | "🏕️"
  | "🏕"
  | "🏖️"
  | "🏖"
  | "🏜️"
  | "🏜"
  | "🏝️"
  | "🏝"
  | "🏞️"
  | "🏞"
  | "🏟️"
  | "🏟"
  | "🏛️"
  | "🏛"
  | "🏗️"
  | "🏗"
  | "🧱"
  | "🪨"
  | "🪵"
  | "🛖"
  | "🏘️"
  | "🏘"
  | "🏚️"
  | "🏚"
  | "🏠"
  | "🏡"
  | "🏢"
  | "🏣"
  | "🏤"
  | "🏥"
  | "🏦"
  | "🏨"
  | "🏩"
  | "🏪"
  | "🏫"
  | "🏬"
  | "🏭"
  | "🏯"
  | "🏰"
  | "💒"
  | "🗼"
  | "🗽"
  | "⛪"
  | "🕌"
  | "🛕"
  | "🕍"
  | "⛩️"
  | "⛩"
  | "🕋"
  | "⛲"
  | "⛺"
  | "🌁"
  | "🌃"
  | "🏙️"
  | "🏙"
  | "🌄"
  | "🌅"
  | "🌆"
  | "🌇"
  | "🌉"
  | "♨️"
  | "♨"
  | "🎠"
  | "🛝"
  | "🎡"
  | "🎢"
  | "💈"
  | "🎪"
  | "🚂"
  | "🚃"
  | "🚄"
  | "🚅"
  | "🚆"
  | "🚇"
  | "🚈"
  | "🚉"
  | "🚊"
  | "🚝"
  | "🚞"
  | "🚋"
  | "🚌"
  | "🚍"
  | "🚎"
  | "🚐"
  | "🚑"
  | "🚒"
  | "🚓"
  | "🚔"
  | "🚕"
  | "🚖"
  | "🚗"
  | "🚘"
  | "🚙"
  | "🛻"
  | "🚚"
  | "🚛"
  | "🚜"
  | "🏎️"
  | "🏎"
  | "🏍️"
  | "🏍"
  | "🛵"
  | "🦽"
  | "🦼"
  | "🛺"
  | "🚲"
  | "🛴"
  | "🛹"
  | "🛼"
  | "🚏"
  | "🛣️"
  | "🛣"
  | "🛤️"
  | "🛤"
  | "🛢️"
  | "🛢"
  | "⛽"
  | "🛞"
  | "🚨"
  | "🚥"
  | "🚦"
  | "🛑"
  | "🚧"
  | "⚓"
  | "🛟"
  | "⛵"
  | "🛶"
  | "🚤"
  | "🛳️"
  | "🛳"
  | "⛴️"
  | "⛴"
  | "🛥️"
  | "🛥"
  | "🚢"
  | "✈️"
  | "✈"
  | "🛩️"
  | "🛩"
  | "🛫"
  | "🛬"
  | "🪂"
  | "💺"
  | "🚁"
  | "🚟"
  | "🚠"
  | "🚡"
  | "🛰️"
  | "🛰"
  | "🚀"
  | "🛸"
  | "🛎️"
  | "🛎"
  | "🧳"
  | "⌛"
  | "⏳"
  | "⌚"
  | "⏰"
  | "⏱️"
  | "⏱"
  | "⏲️"
  | "⏲"
  | "🕰️"
  | "🕰"
  | "🕛"
  | "🕧"
  | "🕐"
  | "🕜"
  | "🕑"
  | "🕝"
  | "🕒"
  | "🕞"
  | "🕓"
  | "🕟"
  | "🕔"
  | "🕠"
  | "🕕"
  | "🕡"
  | "🕖"
  | "🕢"
  | "🕗"
  | "🕣"
  | "🕘"
  | "🕤"
  | "🕙"
  | "🕥"
  | "🕚"
  | "🕦"
  | "🌑"
  | "🌒"
  | "🌓"
  | "🌔"
  | "🌕"
  | "🌖"
  | "🌗"
  | "🌘"
  | "🌙"
  | "🌚"
  | "🌛"
  | "🌜"
  | "🌡️"
  | "🌡"
  | "☀️"
  | "☀"
  | "🌝"
  | "🌞"
  | "🪐"
  | "⭐"
  | "🌟"
  | "🌠"
  | "🌌"
  | "☁️"
  | "☁"
  | "⛅"
  | "⛈️"
  | "⛈"
  | "🌤️"
  | "🌤"
  | "🌥️"
  | "🌥"
  | "🌦️"
  | "🌦"
  | "🌧️"
  | "🌧"
  | "🌨️"
  | "🌨"
  | "🌩️"
  | "🌩"
  | "🌪️"
  | "🌪"
  | "🌫️"
  | "🌫"
  | "🌬️"
  | "🌬"
  | "🌀"
  | "🌈"
  | "🌂"
  | "☂️"
  | "☂"
  | "☔"
  | "⛱️"
  | "⛱"
  | "⚡"
  | "❄️"
  | "❄"
  | "☃️"
  | "☃"
  | "⛄"
  | "☄️"
  | "☄"
  | "🔥"
  | "💧"
  | "🌊"
  | "🎃"
  | "🎄"
  | "🎆"
  | "🎇"
  | "🧨"
  | "✨"
  | "🎈"
  | "🎉"
  | "🎊"
  | "🎋"
  | "🎍"
  | "🎎"
  | "🎏"
  | "🎐"
  | "🎑"
  | "🧧"
  | "🎀"
  | "🎁"
  | "🎗️"
  | "🎗"
  | "🎟️"
  | "🎟"
  | "🎫"
  | "🎖️"
  | "🎖"
  | "🏆"
  | "🏅"
  | "🥇"
  | "🥈"
  | "🥉"
  | "⚽"
  | "⚾"
  | "🥎"
  | "🏀"
  | "🏐"
  | "🏈"
  | "🏉"
  | "🎾"
  | "🥏"
  | "🎳"
  | "🏏"
  | "🏑"
  | "🏒"
  | "🥍"
  | "🏓"
  | "🏸"
  | "🥊"
  | "🥋"
  | "🥅"
  | "⛳"
  | "⛸️"
  | "⛸"
  | "🎣"
  | "🤿"
  | "🎽"
  | "🎿"
  | "🛷"
  | "🥌"
  | "🎯"
  | "🪀"
  | "🪁"
  | "🎱"
  | "🔮"
  | "🪄"
  | "🧿"
  | "🪬"
  | "🎮"
  | "🕹️"
  | "🕹"
  | "🎰"
  | "🎲"
  | "🧩"
  | "🧸"
  | "🪅"
  | "🪩"
  | "🪆"
  | "♠️"
  | "♠"
  | "♥️"
  | "♥"
  | "♦️"
  | "♦"
  | "♣️"
  | "♣"
  | "♟️"
  | "♟"
  | "🃏"
  | "🀄"
  | "🎴"
  | "🎭"
  | "🖼️"
  | "🖼"
  | "🎨"
  | "🧵"
  | "🪡"
  | "🧶"
  | "🪢"
  | "👓"
  | "🕶️"
  | "🕶"
  | "🥽"
  | "🥼"
  | "🦺"
  | "👔"
  | "👕"
  | "👖"
  | "🧣"
  | "🧤"
  | "🧥"
  | "🧦"
  | "👗"
  | "👘"
  | "🥻"
  | "🩱"
  | "🩲"
  | "🩳"
  | "👙"
  | "👚"
  | "👛"
  | "👜"
  | "👝"
  | "🛍️"
  | "🛍"
  | "🎒"
  | "🩴"
  | "👞"
  | "👟"
  | "🥾"
  | "🥿"
  | "👠"
  | "👡"
  | "🩰"
  | "👢"
  | "👑"
  | "👒"
  | "🎩"
  | "🎓"
  | "🧢"
  | "🪖"
  | "⛑️"
  | "⛑"
  | "📿"
  | "💄"
  | "💍"
  | "💎"
  | "🔇"
  | "🔈"
  | "🔉"
  | "🔊"
  | "📢"
  | "📣"
  | "📯"
  | "🔔"
  | "🔕"
  | "🎼"
  | "🎵"
  | "🎶"
  | "🎙️"
  | "🎙"
  | "🎚️"
  | "🎚"
  | "🎛️"
  | "🎛"
  | "🎤"
  | "🎧"
  | "📻"
  | "🎷"
  | "🪗"
  | "🎸"
  | "🎹"
  | "🎺"
  | "🎻"
  | "🪕"
  | "🥁"
  | "🪘"
  | "📱"
  | "📲"
  | "☎️"
  | "☎"
  | "📞"
  | "📟"
  | "📠"
  | "🔋"
  | "🪫"
  | "🔌"
  | "💻"
  | "🖥️"
  | "🖥"
  | "🖨️"
  | "🖨"
  | "⌨️"
  | "⌨"
  | "🖱️"
  | "🖱"
  | "🖲️"
  | "🖲"
  | "💽"
  | "💾"
  | "💿"
  | "📀"
  | "🧮"
  | "🎥"
  | "🎞️"
  | "🎞"
  | "📽️"
  | "📽"
  | "🎬"
  | "📺"
  | "📷"
  | "📸"
  | "📹"
  | "📼"
  | "🔍"
  | "🔎"
  | "🕯️"
  | "🕯"
  | "💡"
  | "🔦"
  | "🏮"
  | "🪔"
  | "📔"
  | "📕"
  | "📖"
  | "📗"
  | "📘"
  | "📙"
  | "📚"
  | "📓"
  | "📒"
  | "📃"
  | "📜"
  | "📄"
  | "📰"
  | "🗞️"
  | "🗞"
  | "📑"
  | "🔖"
  | "🏷️"
  | "🏷"
  | "💰"
  | "🪙"
  | "💴"
  | "💵"
  | "💶"
  | "💷"
  | "💸"
  | "💳"
  | "🧾"
  | "💹"
  | "✉️"
  | "✉"
  | "📧"
  | "📨"
  | "📩"
  | "📤"
  | "📥"
  | "📦"
  | "📫"
  | "📪"
  | "📬"
  | "📭"
  | "📮"
  | "🗳️"
  | "🗳"
  | "✏️"
  | "✏"
  | "✒️"
  | "✒"
  | "🖋️"
  | "🖋"
  | "🖊️"
  | "🖊"
  | "🖌️"
  | "🖌"
  | "🖍️"
  | "🖍"
  | "📝"
  | "💼"
  | "📁"
  | "📂"
  | "🗂️"
  | "🗂"
  | "📅"
  | "📆"
  | "🗒️"
  | "🗒"
  | "🗓️"
  | "🗓"
  | "📇"
  | "📈"
  | "📉"
  | "📊"
  | "📋"
  | "📌"
  | "📍"
  | "📎"
  | "🖇️"
  | "🖇"
  | "📏"
  | "📐"
  | "✂️"
  | "✂"
  | "🗃️"
  | "🗃"
  | "🗄️"
  | "🗄"
  | "🗑️"
  | "🗑"
  | "🔒"
  | "🔓"
  | "🔏"
  | "🔐"
  | "🔑"
  | "🗝️"
  | "🗝"
  | "🔨"
  | "🪓"
  | "⛏️"
  | "⛏"
  | "⚒️"
  | "⚒"
  | "🛠️"
  | "🛠"
  | "🗡️"
  | "🗡"
  | "⚔️"
  | "⚔"
  | "🔫"
  | "🪃"
  | "🏹"
  | "🛡️"
  | "🛡"
  | "🪚"
  | "🔧"
  | "🪛"
  | "🔩"
  | "⚙️"
  | "⚙"
  | "🗜️"
  | "🗜"
  | "⚖️"
  | "⚖"
  | "🦯"
  | "🔗"
  | "⛓️"
  | "⛓"
  | "🪝"
  | "🧰"
  | "🧲"
  | "🪜"
  | "⚗️"
  | "⚗"
  | "🧪"
  | "🧫"
  | "🧬"
  | "🔬"
  | "🔭"
  | "📡"
  | "💉"
  | "🩸"
  | "💊"
  | "🩹"
  | "🩼"
  | "🩺"
  | "🩻"
  | "🚪"
  | "🛗"
  | "🪞"
  | "🪟"
  | "🛏️"
  | "🛏"
  | "🛋️"
  | "🛋"
  | "🪑"
  | "🚽"
  | "🪠"
  | "🚿"
  | "🛁"
  | "🪤"
  | "🪒"
  | "🧴"
  | "🧷"
  | "🧹"
  | "🧺"
  | "🧻"
  | "🪣"
  | "🧼"
  | "🫧"
  | "🪥"
  | "🧽"
  | "🧯"
  | "🛒"
  | "🚬"
  | "⚰️"
  | "⚰"
  | "🪦"
  | "⚱️"
  | "⚱"
  | "🗿"
  | "🪧"
  | "🪪"
  | "🏧"
  | "🚮"
  | "🚰"
  | "♿"
  | "🚹"
  | "🚺"
  | "🚻"
  | "🚼"
  | "🚾"
  | "🛂"
  | "🛃"
  | "🛄"
  | "🛅"
  | "⚠️"
  | "⚠"
  | "🚸"
  | "⛔"
  | "🚫"
  | "🚳"
  | "🚭"
  | "🚯"
  | "🚱"
  | "🚷"
  | "📵"
  | "🔞"
  | "☢️"
  | "☢"
  | "☣️"
  | "☣"
  | "⬆️"
  | "⬆"
  | "↗️"
  | "↗"
  | "➡️"
  | "➡"
  | "↘️"
  | "↘"
  | "⬇️"
  | "⬇"
  | "↙️"
  | "↙"
  | "⬅️"
  | "⬅"
  | "↖️"
  | "↖"
  | "↕️"
  | "↕"
  | "↔️"
  | "↩️"
  | "↩"
  | "↪️"
  | "↪"
  | "⤴️"
  | "⤴"
  | "⤵️"
  | "⤵"
  | "🔃"
  | "🔄"
  | "🔙"
  | "🔚"
  | "🔛"
  | "🔜"
  | "🔝"
  | "🛐"
  | "⚛️"
  | "⚛"
  | "🕉️"
  | "🕉"
  | "✡️"
  | "✡"
  | "☸️"
  | "☸"
  | "☯️"
  | "☯"
  | "✝️"
  | "✝"
  | "☦️"
  | "☦"
  | "☪️"
  | "☪"
  | "☮️"
  | "☮"
  | "🕎"
  | "🔯"
  | "♈"
  | "♉"
  | "♊"
  | "♋"
  | "♌"
  | "♍"
  | "♎"
  | "♏"
  | "♐"
  | "♑"
  | "♒"
  | "♓"
  | "⛎"
  | "🔀"
  | "🔁"
  | "🔂"
  | "▶️"
  | "⏩"
  | "⏭️"
  | "⏭"
  | "⏯️"
  | "⏯"
  | "◀️"
  | "⏪"
  | "⏮️"
  | "⏮"
  | "🔼"
  | "⏫"
  | "🔽"
  | "⏬"
  | "⏸️"
  | "⏸"
  | "⏹️"
  | "⏹"
  | "⏺️"
  | "⏺"
  | "⏏️"
  | "⏏"
  | "🎦"
  | "🔅"
  | "🔆"
  | "📶"
  | "📳"
  | "📴"
  | "♀️"
  | "♀"
  | "♂️"
  | "♂"
  | "⚧️"
  | "⚧"
  | "✖️"
  | "✖"
  | "➕"
  | "➖"
  | "➗"
  | "🟰"
  | "♾️"
  | "♾"
  | "‼️"
  | "‼"
  | "⁉️"
  | "⁉"
  | "❓"
  | "❔"
  | "❕"
  | "❗"
  | "〰️"
  | "〰"
  | "💱"
  | "💲"
  | "⚕️"
  | "⚕"
  | "♻️"
  | "♻"
  | "⚜️"
  | "⚜"
  | "🔱"
  | "📛"
  | "🔰"
  | "⭕"
  | "✅"
  | "☑️"
  | "☑"
  | "✔️"
  | "✔"
  | "❌"
  | "❎"
  | "➰"
  | "➿"
  | "〽️"
  | "〽"
  | "✳️"
  | "✳"
  | "✴️"
  | "✴"
  | "❇️"
  | "❇"
  | "©️"
  | "©"
  | "®️"
  | "®"
  | "™️"
  | "#️⃣"
  | "#⃣"
  | "*️⃣"
  | "*⃣"
  | "0️⃣"
  | "0⃣"
  | "1️⃣"
  | "1⃣"
  | "2️⃣"
  | "2⃣"
  | "3️⃣"
  | "3⃣"
  | "4️⃣"
  | "4⃣"
  | "5️⃣"
  | "5⃣"
  | "6️⃣"
  | "6⃣"
  | "7️⃣"
  | "7⃣"
  | "8️⃣"
  | "8⃣"
  | "9️⃣"
  | "9⃣"
  | "🔟"
  | "🔠"
  | "🔡"
  | "🔢"
  | "🔣"
  | "🔤"
  | "🅰️"
  | "🅰"
  | "🆎"
  | "🅱️"
  | "🅱"
  | "🆑"
  | "🆒"
  | "🆓"
  | "ℹ️"
  | "ℹ"
  | "🆔"
  | "Ⓜ️"
  | "Ⓜ"
  | "🆕"
  | "🆖"
  | "🅾️"
  | "🅾"
  | "🆗"
  | "🅿️"
  | "🅿"
  | "🆘"
  | "🆙"
  | "🆚"
  | "🈁"
  | "🈂️"
  | "🈂"
  | "🈷️"
  | "🈷"
  | "🈶"
  | "🈯"
  | "🉐"
  | "🈹"
  | "🈚"
  | "🈲"
  | "🉑"
  | "🈸"
  | "🈴"
  | "🈳"
  | "㊗️"
  | "㊗"
  | "㊙️"
  | "㊙"
  | "🈺"
  | "🈵"
  | "🔴"
  | "🟠"
  | "🟡"
  | "🟢"
  | "🔵"
  | "🟣"
  | "🟤"
  | "⚫"
  | "⚪"
  | "🟥"
  | "🟧"
  | "🟨"
  | "🟩"
  | "🟦"
  | "🟪"
  | "🟫"
  | "⬛"
  | "⬜"
  | "◼️"
  | "◼"
  | "◻️"
  | "◻"
  | "◾"
  | "◽"
  | "▪️"
  | "▪"
  | "▫️"
  | "▫"
  | "🔶"
  | "🔷"
  | "🔸"
  | "🔹"
  | "🔺"
  | "🔻"
  | "💠"
  | "🔘"
  | "🔳"
  | "🔲"
  | "🏁"
  | "🚩"
  | "🎌"
  | "🏴"
  | "🏳️"
  | "🏳"
  | "🏳️‍🌈"
  | "🏳‍🌈"
  | "🏳️‍⚧️"
  | "🏴‍☠️"
  | "🏴‍☠"
  | "🇦🇨"
  | "🇦🇩"
  | "🇦🇪"
  | "🇦🇫"
  | "🇦🇬"
  | "🇦🇮"
  | "🇦🇱"
  | "🇦🇲"
  | "🇦🇴"
  | "🇦🇶"
  | "🇦🇷"
  | "🇦🇸"
  | "🇦🇹"
  | "🇦🇺"
  | "🇦🇼"
  | "🇦🇽"
  | "🇦🇿"
  | "🇧🇦"
  | "🇧🇧"
  | "🇧🇩"
  | "🇧🇪"
  | "🇧🇫"
  | "🇧🇬"
  | "🇧🇭"
  | "🇧🇮"
  | "🇧🇯"
  | "🇧🇱"
  | "🇧🇲"
  | "🇧🇳"
  | "🇧🇴"
  | "🇧🇶"
  | "🇧🇷"
  | "🇧🇸"
  | "🇧🇹"
  | "🇧🇻"
  | "🇧🇼"
  | "🇧🇾"
  | "🇧🇿"
  | "🇨🇦"
  | "🇨🇨"
  | "🇨🇩"
  | "🇨🇫"
  | "🇨🇬"
  | "🇨🇭"
  | "🇨🇮"
  | "🇨🇰"
  | "🇨🇱"
  | "🇨🇲"
  | "🇨🇳"
  | "🇨🇴"
  | "🇨🇵"
  | "🇨🇷"
  | "🇨🇺"
  | "🇨🇻"
  | "🇨🇼"
  | "🇨🇽"
  | "🇨🇾"
  | "🇨🇿"
  | "🇩🇪"
  | "🇩🇬"
  | "🇩🇯"
  | "🇩🇰"
  | "🇩🇲"
  | "🇩🇴"
  | "🇩🇿"
  | "🇪🇦"
  | "🇪🇨"
  | "🇪🇪"
  | "🇪🇬"
  | "🇪🇭"
  | "🇪🇷"
  | "🇪🇸"
  | "🇪🇹"
  | "🇪🇺"
  | "🇫🇮"
  | "🇫🇯"
  | "🇫🇰"
  | "🇫🇲"
  | "🇫🇴"
  | "🇫🇷"
  | "🇬🇦"
  | "🇬🇧"
  | "🇬🇩"
  | "🇬🇪"
  | "🇬🇫"
  | "🇬🇬"
  | "🇬🇭"
  | "🇬🇮"
  | "🇬🇱"
  | "🇬🇲"
  | "🇬🇳"
  | "🇬🇵"
  | "🇬🇶"
  | "🇬🇷"
  | "🇬🇸"
  | "🇬🇹"
  | "🇬🇺"
  | "🇬🇼"
  | "🇬🇾"
  | "🇭🇰"
  | "🇭🇲"
  | "🇭🇳"
  | "🇭🇷"
  | "🇭🇹"
  | "🇭🇺"
  | "🇮🇨"
  | "🇮🇩"
  | "🇮🇪"
  | "🇮🇱"
  | "🇮🇲"
  | "🇮🇳"
  | "🇮🇴"
  | "🇮🇶"
  | "🇮🇷"
  | "🇮🇸"
  | "🇮🇹"
  | "🇯🇪"
  | "🇯🇲"
  | "🇯🇴"
  | "🇯🇵"
  | "🇰🇪"
  | "🇰🇬"
  | "🇰🇭"
  | "🇰🇮"
  | "🇰🇲"
  | "🇰🇳"
  | "🇰🇵"
  | "🇰🇷"
  | "🇰🇼"
  | "🇰🇾"
  | "🇰🇿"
  | "🇱🇦"
  | "🇱🇧"
  | "🇱🇨"
  | "🇱🇮"
  | "🇱🇰"
  | "🇱🇷"
  | "🇱🇸"
  | "🇱🇹"
  | "🇱🇺"
  | "🇱🇻"
  | "🇱🇾"
  | "🇲🇦"
  | "🇲🇨"
  | "🇲🇩"
  | "🇲🇪"
  | "🇲🇫"
  | "🇲🇬"
  | "🇲🇭"
  | "🇲🇰"
  | "🇲🇱"
  | "🇲🇲"
  | "🇲🇳"
  | "🇲🇴"
  | "🇲🇵"
  | "🇲🇶"
  | "🇲🇷"
  | "🇲🇸"
  | "🇲🇹"
  | "🇲🇺"
  | "🇲🇻"
  | "🇲🇼"
  | "🇲🇽"
  | "🇲🇾"
  | "🇲🇿"
  | "🇳🇦"
  | "🇳🇨"
  | "🇳🇪"
  | "🇳🇫"
  | "🇳🇬"
  | "🇳🇮"
  | "🇳🇱"
  | "🇳🇴"
  | "🇳🇵"
  | "🇳🇷"
  | "🇳🇺"
  | "🇳🇿"
  | "🇴🇲"
  | "🇵🇦"
  | "🇵🇪"
  | "🇵🇫"
  | "🇵🇬"
  | "🇵🇭"
  | "🇵🇰"
  | "🇵🇱"
  | "🇵🇲"
  | "🇵🇳"
  | "🇵🇷"
  | "🇵🇸"
  | "🇵🇹"
  | "🇵🇼"
  | "🇵🇾"
  | "🇶🇦"
  | "🇷🇪"
  | "🇷🇴"
  | "🇷🇸"
  | "🇷🇺"
  | "🇷🇼"
  | "🇸🇦"
  | "🇸🇧"
  | "🇸🇨"
  | "🇸🇩"
  | "🇸🇪"
  | "🇸🇬"
  | "🇸🇭"
  | "🇸🇮"
  | "🇸🇯"
  | "🇸🇰"
  | "🇸🇱"
  | "🇸🇲"
  | "🇸🇳"
  | "🇸🇴"
  | "🇸🇷"
  | "🇸🇸"
  | "🇸🇹"
  | "🇸🇻"
  | "🇸🇽"
  | "🇸🇾"
  | "🇸🇿"
  | "🇹🇦"
  | "🇹🇨"
  | "🇹🇩"
  | "🇹🇫"
  | "🇹🇬"
  | "🇹🇭"
  | "🇹🇯"
  | "🇹🇰"
  | "🇹🇱"
  | "🇹🇲"
  | "🇹🇳"
  | "🇹🇴"
  | "🇹🇷"
  | "🇹🇹"
  | "🇹🇻"
  | "🇹🇼"
  | "🇹🇿"
  | "🇺🇦"
  | "🇺🇬"
  | "🇺🇲"
  | "🇺🇳"
  | "🇺🇸"
  | "🇺🇾"
  | "🇺🇿"
  | "🇻🇦"
  | "🇻🇨"
  | "🇻🇪"
  | "🇻🇬"
  | "🇻🇮"
  | "🇻🇳"
  | "🇻🇺"
  | "🇼🇫"
  | "🇼🇸"
  | "🇽🇰"
  | "🇾🇪"
  | "🇾🇹"
  | "🇿🇦"
  | "🇿🇲"
  | "🇿🇼"
  | "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
  | "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
  | "🏴󠁧󠁢󠁷󠁬󠁳󠁿"

type EmojiPageIconResponse = { type: "emoji"; emoji: EmojiRequest }

type ExternalPageIconResponse = {
  type: "external"
  external: { url: TextRequest }
}

type FilePageIconResponse = {
  type: "file"
  file: { url: string; expiry_time: string }
}

type CustomEmojiPageIconResponse = {
  type: "custom_emoji"
  custom_emoji: CustomEmojiResponse
}

type PageIconResponse =
  | EmojiPageIconResponse
  | ExternalPageIconResponse
  | FilePageIconResponse
  | CustomEmojiPageIconResponse

type ExternalPageCoverResponse = {
  type: "external"
  external: { url: TextRequest }
}

type FilePageCoverResponse = {
  type: "file"
  file: { url: string; expiry_time: string }
}

type PageCoverResponse = ExternalPageCoverResponse | FilePageCoverResponse

export type PageObjectResponse = {
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  properties: Record<
    string,
    | { type: "number"; number: number | null; id: string }
    | { type: "url"; url: string | null; id: string }
    | { type: "select"; select: PartialSelectResponse | null; id: string }
    | {
        type: "multi_select"
        multi_select: Array<PartialSelectResponse>
        id: string
      }
    | { type: "status"; status: PartialSelectResponse | null; id: string }
    | { type: "date"; date: DateResponse | null; id: string }
    | { type: "email"; email: string | null; id: string }
    | { type: "phone_number"; phone_number: string | null; id: string }
    | { type: "checkbox"; checkbox: boolean; id: string }
    | {
        type: "files"
        files: Array<
          | {
              file: { url: string; expiry_time: string }
              name: StringRequest
              type?: "file"
            }
          | {
              external: { url: TextRequest }
              name: StringRequest
              type?: "external"
            }
        >
        id: string
      }
    | {
        type: "created_by"
        created_by: PartialUserObjectResponse | UserObjectResponse
        id: string
      }
    | { type: "created_time"; created_time: string; id: string }
    | {
        type: "last_edited_by"
        last_edited_by: PartialUserObjectResponse | UserObjectResponse
        id: string
      }
    | { type: "last_edited_time"; last_edited_time: string; id: string }
    | { type: "formula"; formula: FormulaPropertyResponse; id: string }
    | { type: "button"; button: Record<string, never>; id: string }
    | {
        type: "unique_id"
        unique_id: { prefix: string | null; number: number | null }
        id: string
      }
    | {
        type: "verification"
        verification:
          | VerificationPropertyUnverifiedResponse
          | VerificationPropertyResponse
          | null
        id: string
      }
    | { type: "title"; title: Array<RichTextItemResponse>; id: string }
    | { type: "rich_text"; rich_text: Array<RichTextItemResponse>; id: string }
    | {
        type: "people"
        people: Array<PartialUserObjectResponse | UserObjectResponse>
        id: string
      }
    | { type: "relation"; relation: Array<{ id: string }>; id: string }
    | {
        type: "rollup"
        rollup:
          | { type: "number"; number: number | null; function: RollupFunction }
          | {
              type: "date"
              date: DateResponse | null
              function: RollupFunction
            }
          | {
              type: "array"
              array: Array<
                | { type: "number"; number: number | null }
                | { type: "url"; url: string | null }
                | { type: "select"; select: PartialSelectResponse | null }
                | {
                    type: "multi_select"
                    multi_select: Array<PartialSelectResponse>
                  }
                | { type: "status"; status: PartialSelectResponse | null }
                | { type: "date"; date: DateResponse | null }
                | { type: "email"; email: string | null }
                | { type: "phone_number"; phone_number: string | null }
                | { type: "checkbox"; checkbox: boolean }
                | {
                    type: "files"
                    files: Array<
                      | {
                          file: { url: string; expiry_time: string }
                          name: StringRequest
                          type?: "file"
                        }
                      | {
                          external: { url: TextRequest }
                          name: StringRequest
                          type?: "external"
                        }
                    >
                  }
                | {
                    type: "created_by"
                    created_by: PartialUserObjectResponse | UserObjectResponse
                  }
                | { type: "created_time"; created_time: string }
                | {
                    type: "last_edited_by"
                    last_edited_by:
                      | PartialUserObjectResponse
                      | UserObjectResponse
                  }
                | { type: "last_edited_time"; last_edited_time: string }
                | { type: "formula"; formula: FormulaPropertyResponse }
                | { type: "button"; button: Record<string, never> }
                | {
                    type: "unique_id"
                    unique_id: { prefix: string | null; number: number | null }
                  }
                | {
                    type: "verification"
                    verification:
                      | VerificationPropertyUnverifiedResponse
                      | VerificationPropertyResponse
                      | null
                  }
                | { type: "title"; title: Array<RichTextItemResponse> }
                | { type: "rich_text"; rich_text: Array<RichTextItemResponse> }
                | {
                    type: "people"
                    people: Array<
                      PartialUserObjectResponse | UserObjectResponse
                    >
                  }
                | { type: "relation"; relation: Array<{ id: string }> }
              >
              function: RollupFunction
            }
        id: string
      }
  >
  icon: PageIconResponse | null
  cover: PageCoverResponse | null
  created_by: PartialUserObjectResponse
  last_edited_by: PartialUserObjectResponse
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  in_trash: boolean
  url: string
  public_url: string | null
}

export type PartialPageObjectResponse = { object: "page"; id: string }

type NumberFormat =
  | "number"
  | "number_with_commas"
  | "percent"
  | "dollar"
  | "australian_dollar"
  | "canadian_dollar"
  | "singapore_dollar"
  | "euro"
  | "pound"
  | "yen"
  | "ruble"
  | "rupee"
  | "won"
  | "yuan"
  | "real"
  | "lira"
  | "rupiah"
  | "franc"
  | "hong_kong_dollar"
  | "new_zealand_dollar"
  | "krona"
  | "norwegian_krone"
  | "mexican_peso"
  | "rand"
  | "new_taiwan_dollar"
  | "danish_krone"
  | "zloty"
  | "baht"
  | "forint"
  | "koruna"
  | "shekel"
  | "chilean_peso"
  | "philippine_peso"
  | "dirham"
  | "colombian_peso"
  | "riyal"
  | "ringgit"
  | "leu"
  | "argentine_peso"
  | "uruguayan_peso"
  | "peruvian_sol"

type PropertyDescriptionRequest = string

type NumberDatabasePropertyConfigResponse = {
  type: "number"
  number: { format: NumberFormat }
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type FormulaDatabasePropertyConfigResponse = {
  type: "formula"
  formula: { expression: string }
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type SelectPropertyResponse = {
  id: StringRequest
  name: TextRequest
  color: SelectColor
  description: TextRequest | null
}

type SelectDatabasePropertyConfigResponse = {
  type: "select"
  select: { options: Array<SelectPropertyResponse> }
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type MultiSelectDatabasePropertyConfigResponse = {
  type: "multi_select"
  multi_select: { options: Array<SelectPropertyResponse> }
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type StatusPropertyResponse = {
  id: StringRequest
  name: TextRequest
  color: SelectColor
  description: TextRequest | null
}

type StatusDatabasePropertyConfigResponse = {
  type: "status"
  status: {
    options: Array<StatusPropertyResponse>
    groups: Array<{
      id: StringRequest
      name: TextRequest
      color: SelectColor
      option_ids: Array<string>
    }>
  }
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type SinglePropertyDatabasePropertyRelationConfigResponse = {
  type: "single_property"
  single_property: EmptyObject
  database_id: IdRequest
}

type DualPropertyDatabasePropertyRelationConfigResponse = {
  type: "dual_property"
  dual_property: {
    synced_property_id: StringRequest
    synced_property_name: TextRequest
  }
  database_id: IdRequest
}

type DatabasePropertyRelationConfigResponse =
  | SinglePropertyDatabasePropertyRelationConfigResponse
  | DualPropertyDatabasePropertyRelationConfigResponse

type RelationDatabasePropertyConfigResponse = {
  type: "relation"
  relation: DatabasePropertyRelationConfigResponse
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type RollupDatabasePropertyConfigResponse = {
  type: "rollup"
  rollup: {
    rollup_property_name: string
    relation_property_name: string
    rollup_property_id: string
    relation_property_id: string
    function: RollupFunction
  }
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type UniqueIdDatabasePropertyConfigResponse = {
  type: "unique_id"
  unique_id: { prefix: string | null }
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type TitleDatabasePropertyConfigResponse = {
  type: "title"
  title: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type RichTextDatabasePropertyConfigResponse = {
  type: "rich_text"
  rich_text: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type UrlDatabasePropertyConfigResponse = {
  type: "url"
  url: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type PeopleDatabasePropertyConfigResponse = {
  type: "people"
  people: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type FilesDatabasePropertyConfigResponse = {
  type: "files"
  files: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type EmailDatabasePropertyConfigResponse = {
  type: "email"
  email: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type PhoneNumberDatabasePropertyConfigResponse = {
  type: "phone_number"
  phone_number: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type DateDatabasePropertyConfigResponse = {
  type: "date"
  date: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type CheckboxDatabasePropertyConfigResponse = {
  type: "checkbox"
  checkbox: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type CreatedByDatabasePropertyConfigResponse = {
  type: "created_by"
  created_by: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type CreatedTimeDatabasePropertyConfigResponse = {
  type: "created_time"
  created_time: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type LastEditedByDatabasePropertyConfigResponse = {
  type: "last_edited_by"
  last_edited_by: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type LastEditedTimeDatabasePropertyConfigResponse = {
  type: "last_edited_time"
  last_edited_time: EmptyObject
  id: string
  name: string
  description: PropertyDescriptionRequest | null
}

type DatabasePropertyConfigResponse =
  | NumberDatabasePropertyConfigResponse
  | FormulaDatabasePropertyConfigResponse
  | SelectDatabasePropertyConfigResponse
  | MultiSelectDatabasePropertyConfigResponse
  | StatusDatabasePropertyConfigResponse
  | RelationDatabasePropertyConfigResponse
  | RollupDatabasePropertyConfigResponse
  | UniqueIdDatabasePropertyConfigResponse
  | TitleDatabasePropertyConfigResponse
  | RichTextDatabasePropertyConfigResponse
  | UrlDatabasePropertyConfigResponse
  | PeopleDatabasePropertyConfigResponse
  | FilesDatabasePropertyConfigResponse
  | EmailDatabasePropertyConfigResponse
  | PhoneNumberDatabasePropertyConfigResponse
  | DateDatabasePropertyConfigResponse
  | CheckboxDatabasePropertyConfigResponse
  | CreatedByDatabasePropertyConfigResponse
  | CreatedTimeDatabasePropertyConfigResponse
  | LastEditedByDatabasePropertyConfigResponse
  | LastEditedTimeDatabasePropertyConfigResponse

export type PartialDatabaseObjectResponse = {
  object: "database"
  id: string
  properties: Record<string, DatabasePropertyConfigResponse>
}

export type DatabaseObjectResponse = {
  title: Array<RichTextItemResponse>
  description: Array<RichTextItemResponse>
  icon: PageIconResponse | null
  cover: PageCoverResponse | null
  properties: Record<string, DatabasePropertyConfigResponse>
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  created_by: PartialUserObjectResponse
  last_edited_by: PartialUserObjectResponse
  is_inline: boolean
  object: "database"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  in_trash: boolean
  url: string
  public_url: string | null
}

export type PartialBlockObjectResponse = { object: "block"; id: string }

type ApiColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "default_background"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background"

export type ParagraphBlockObjectResponse = {
  type: "paragraph"
  paragraph: { rich_text: Array<RichTextItemResponse>; color: ApiColor }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type Heading1BlockObjectResponse = {
  type: "heading_1"
  heading_1: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    is_toggleable: boolean
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type Heading2BlockObjectResponse = {
  type: "heading_2"
  heading_2: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    is_toggleable: boolean
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type Heading3BlockObjectResponse = {
  type: "heading_3"
  heading_3: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    is_toggleable: boolean
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type BulletedListItemBlockObjectResponse = {
  type: "bulleted_list_item"
  bulleted_list_item: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type NumberedListItemBlockObjectResponse = {
  type: "numbered_list_item"
  numbered_list_item: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type QuoteBlockObjectResponse = {
  type: "quote"
  quote: { rich_text: Array<RichTextItemResponse>; color: ApiColor }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type ToDoBlockObjectResponse = {
  type: "to_do"
  to_do: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    checked: boolean
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type ToggleBlockObjectResponse = {
  type: "toggle"
  toggle: { rich_text: Array<RichTextItemResponse>; color: ApiColor }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type TemplateBlockObjectResponse = {
  type: "template"
  template: { rich_text: Array<RichTextItemResponse> }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type SyncedBlockBlockObjectResponse = {
  type: "synced_block"
  synced_block: {
    synced_from: { type: "block_id"; block_id: IdRequest } | null
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type ChildPageBlockObjectResponse = {
  type: "child_page"
  child_page: { title: string }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type ChildDatabaseBlockObjectResponse = {
  type: "child_database"
  child_database: { title: string }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type EquationBlockObjectResponse = {
  type: "equation"
  equation: { expression: string }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

type LanguageRequest =
  | "abap"
  | "agda"
  | "arduino"
  | "ascii art"
  | "assembly"
  | "bash"
  | "basic"
  | "bnf"
  | "c"
  | "c#"
  | "c++"
  | "clojure"
  | "coffeescript"
  | "coq"
  | "css"
  | "dart"
  | "dhall"
  | "diff"
  | "docker"
  | "ebnf"
  | "elixir"
  | "elm"
  | "erlang"
  | "f#"
  | "flow"
  | "fortran"
  | "gherkin"
  | "glsl"
  | "go"
  | "graphql"
  | "groovy"
  | "haskell"
  | "hcl"
  | "html"
  | "idris"
  | "java"
  | "javascript"
  | "json"
  | "julia"
  | "kotlin"
  | "latex"
  | "less"
  | "lisp"
  | "livescript"
  | "llvm ir"
  | "lua"
  | "makefile"
  | "markdown"
  | "markup"
  | "matlab"
  | "mathematica"
  | "mermaid"
  | "nix"
  | "notion formula"
  | "objective-c"
  | "ocaml"
  | "pascal"
  | "perl"
  | "php"
  | "plain text"
  | "powershell"
  | "prolog"
  | "protobuf"
  | "purescript"
  | "python"
  | "r"
  | "racket"
  | "reason"
  | "ruby"
  | "rust"
  | "sass"
  | "scala"
  | "scheme"
  | "scss"
  | "shell"
  | "smalltalk"
  | "solidity"
  | "sql"
  | "swift"
  | "toml"
  | "typescript"
  | "vb.net"
  | "verilog"
  | "vhdl"
  | "visual basic"
  | "webassembly"
  | "xml"
  | "yaml"
  | "java/c/c++/c#"

export type CodeBlockObjectResponse = {
  type: "code"
  code: {
    rich_text: Array<RichTextItemResponse>
    caption: Array<RichTextItemResponse>
    language: LanguageRequest
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type CalloutBlockObjectResponse = {
  type: "callout"
  callout: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    icon: PageIconResponse | null
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type DividerBlockObjectResponse = {
  type: "divider"
  divider: EmptyObject
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type BreadcrumbBlockObjectResponse = {
  type: "breadcrumb"
  breadcrumb: EmptyObject
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type TableOfContentsBlockObjectResponse = {
  type: "table_of_contents"
  table_of_contents: { color: ApiColor }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type ColumnListBlockObjectResponse = {
  type: "column_list"
  column_list: EmptyObject
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

type ColumnResponse = {
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
}

export type ColumnBlockObjectResponse = {
  type: "column"
  column: ColumnResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type LinkToPageBlockObjectResponse = {
  type: "link_to_page"
  link_to_page:
    | { type: "page_id"; page_id: IdRequest }
    | { type: "database_id"; database_id: IdRequest }
    | { type: "comment_id"; comment_id: IdRequest }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type TableBlockObjectResponse = {
  type: "table"
  table: {
    has_column_header: boolean
    has_row_header: boolean
    table_width: number
  }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type TableRowBlockObjectResponse = {
  type: "table_row"
  table_row: { cells: Array<Array<RichTextItemResponse>> }
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

type MediaContentWithUrlAndCaptionResponse = {
  url: string
  caption: Array<RichTextItemResponse>
}

export type EmbedBlockObjectResponse = {
  type: "embed"
  embed: MediaContentWithUrlAndCaptionResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type BookmarkBlockObjectResponse = {
  type: "bookmark"
  bookmark: MediaContentWithUrlAndCaptionResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

type ExternalMediaContentWithFileAndCaptionResponse = {
  type: "external"
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
}

type FileMediaContentWithFileAndCaptionResponse = {
  type: "file"
  file: { url: string; expiry_time: string }
  caption: Array<RichTextItemResponse>
}

type MediaContentWithFileAndCaptionResponse =
  | ExternalMediaContentWithFileAndCaptionResponse
  | FileMediaContentWithFileAndCaptionResponse

export type ImageBlockObjectResponse = {
  type: "image"
  image: MediaContentWithFileAndCaptionResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type VideoBlockObjectResponse = {
  type: "video"
  video: MediaContentWithFileAndCaptionResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type PdfBlockObjectResponse = {
  type: "pdf"
  pdf: MediaContentWithFileAndCaptionResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

type ExternalMediaContentWithFileNameAndCaptionResponse = {
  type: "external"
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
  name: string
}

type FileMediaContentWithFileNameAndCaptionResponse = {
  type: "file"
  file: { url: string; expiry_time: string }
  caption: Array<RichTextItemResponse>
  name: string
}

type MediaContentWithFileNameAndCaptionResponse =
  | ExternalMediaContentWithFileNameAndCaptionResponse
  | FileMediaContentWithFileNameAndCaptionResponse

export type FileBlockObjectResponse = {
  type: "file"
  file: MediaContentWithFileNameAndCaptionResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type AudioBlockObjectResponse = {
  type: "audio"
  audio: MediaContentWithFileAndCaptionResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

type MediaContentWithUrlResponse = { url: TextRequest }

export type LinkPreviewBlockObjectResponse = {
  type: "link_preview"
  link_preview: MediaContentWithUrlResponse
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type UnsupportedBlockObjectResponse = {
  type: "unsupported"
  unsupported: EmptyObject
  parent:
    | { type: "database_id"; database_id: string }
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
    | { type: "workspace"; workspace: true }
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
}

export type BlockObjectResponse =
  | ParagraphBlockObjectResponse
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse
  | BulletedListItemBlockObjectResponse
  | NumberedListItemBlockObjectResponse
  | QuoteBlockObjectResponse
  | ToDoBlockObjectResponse
  | ToggleBlockObjectResponse
  | TemplateBlockObjectResponse
  | SyncedBlockBlockObjectResponse
  | ChildPageBlockObjectResponse
  | ChildDatabaseBlockObjectResponse
  | EquationBlockObjectResponse
  | CodeBlockObjectResponse
  | CalloutBlockObjectResponse
  | DividerBlockObjectResponse
  | BreadcrumbBlockObjectResponse
  | TableOfContentsBlockObjectResponse
  | ColumnListBlockObjectResponse
  | ColumnBlockObjectResponse
  | LinkToPageBlockObjectResponse
  | TableBlockObjectResponse
  | TableRowBlockObjectResponse
  | EmbedBlockObjectResponse
  | BookmarkBlockObjectResponse
  | ImageBlockObjectResponse
  | VideoBlockObjectResponse
  | PdfBlockObjectResponse
  | FileBlockObjectResponse
  | AudioBlockObjectResponse
  | LinkPreviewBlockObjectResponse
  | UnsupportedBlockObjectResponse

export type NumberPropertyItemObjectResponse = {
  type: "number"
  number: number | null
  object: "property_item"
  id: string
}

export type UrlPropertyItemObjectResponse = {
  type: "url"
  url: string | null
  object: "property_item"
  id: string
}

export type SelectPropertyItemObjectResponse = {
  type: "select"
  select: PartialSelectResponse | null
  object: "property_item"
  id: string
}

export type MultiSelectPropertyItemObjectResponse = {
  type: "multi_select"
  multi_select: Array<PartialSelectResponse>
  object: "property_item"
  id: string
}

export type StatusPropertyItemObjectResponse = {
  type: "status"
  status: PartialSelectResponse | null
  object: "property_item"
  id: string
}

export type DatePropertyItemObjectResponse = {
  type: "date"
  date: DateResponse | null
  object: "property_item"
  id: string
}

export type EmailPropertyItemObjectResponse = {
  type: "email"
  email: string | null
  object: "property_item"
  id: string
}

export type PhoneNumberPropertyItemObjectResponse = {
  type: "phone_number"
  phone_number: string | null
  object: "property_item"
  id: string
}

export type CheckboxPropertyItemObjectResponse = {
  type: "checkbox"
  checkbox: boolean
  object: "property_item"
  id: string
}

export type FilesPropertyItemObjectResponse = {
  type: "files"
  files: Array<
    | {
        file: { url: string; expiry_time: string }
        name: StringRequest
        type?: "file"
      }
    | { external: { url: TextRequest }; name: StringRequest; type?: "external" }
  >
  object: "property_item"
  id: string
}

export type CreatedByPropertyItemObjectResponse = {
  type: "created_by"
  created_by: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

export type CreatedTimePropertyItemObjectResponse = {
  type: "created_time"
  created_time: string
  object: "property_item"
  id: string
}

export type LastEditedByPropertyItemObjectResponse = {
  type: "last_edited_by"
  last_edited_by: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

export type LastEditedTimePropertyItemObjectResponse = {
  type: "last_edited_time"
  last_edited_time: string
  object: "property_item"
  id: string
}

export type FormulaPropertyItemObjectResponse = {
  type: "formula"
  formula: FormulaPropertyResponse
  object: "property_item"
  id: string
}

export type ButtonPropertyItemObjectResponse = {
  type: "button"
  button: Record<string, never>
  object: "property_item"
  id: string
}

export type UniqueIdPropertyItemObjectResponse = {
  type: "unique_id"
  unique_id: { prefix: string | null; number: number | null }
  object: "property_item"
  id: string
}

export type VerificationPropertyItemObjectResponse = {
  type: "verification"
  verification:
    | VerificationPropertyUnverifiedResponse
    | VerificationPropertyResponse
    | null
  object: "property_item"
  id: string
}

export type TitlePropertyItemObjectResponse = {
  type: "title"
  title: RichTextItemResponse
  object: "property_item"
  id: string
}

export type RichTextPropertyItemObjectResponse = {
  type: "rich_text"
  rich_text: RichTextItemResponse
  object: "property_item"
  id: string
}

export type PeoplePropertyItemObjectResponse = {
  type: "people"
  people: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

export type RelationPropertyItemObjectResponse = {
  type: "relation"
  relation: { id: string }
  object: "property_item"
  id: string
}

export type RollupPropertyItemObjectResponse = {
  type: "rollup"
  rollup:
    | { type: "number"; number: number | null; function: RollupFunction }
    | { type: "date"; date: DateResponse | null; function: RollupFunction }
    | { type: "array"; array: Array<EmptyObject>; function: RollupFunction }
    | {
        type: "unsupported"
        unsupported: EmptyObject
        function: RollupFunction
      }
    | { type: "incomplete"; incomplete: EmptyObject; function: RollupFunction }
  object: "property_item"
  id: string
}

export type PropertyItemObjectResponse =
  | NumberPropertyItemObjectResponse
  | UrlPropertyItemObjectResponse
  | SelectPropertyItemObjectResponse
  | MultiSelectPropertyItemObjectResponse
  | StatusPropertyItemObjectResponse
  | DatePropertyItemObjectResponse
  | EmailPropertyItemObjectResponse
  | PhoneNumberPropertyItemObjectResponse
  | CheckboxPropertyItemObjectResponse
  | FilesPropertyItemObjectResponse
  | CreatedByPropertyItemObjectResponse
  | CreatedTimePropertyItemObjectResponse
  | LastEditedByPropertyItemObjectResponse
  | LastEditedTimePropertyItemObjectResponse
  | FormulaPropertyItemObjectResponse
  | ButtonPropertyItemObjectResponse
  | UniqueIdPropertyItemObjectResponse
  | VerificationPropertyItemObjectResponse
  | TitlePropertyItemObjectResponse
  | RichTextPropertyItemObjectResponse
  | PeoplePropertyItemObjectResponse
  | RelationPropertyItemObjectResponse
  | RollupPropertyItemObjectResponse

export type CommentObjectResponse = {
  // The comment object type name.
  object: "comment"
  // The ID of the comment.
  id: string
  // The parent of the comment.
  parent:
    | { type: "page_id"; page_id: string }
    | { type: "block_id"; block_id: string }
  // The ID of the discussion thread this comment belongs to.
  discussion_id: string
  // The time when the comment was created.
  created_time: string
  // The time when the comment was last edited.
  last_edited_time: string
  // The user who created the comment.
  created_by: PartialUserObjectResponse
  // The rich text content of the comment.
  rich_text: Array<RichTextItemResponse>
  // Any file attachments associated with the comment.
  attachments?: Array<{
    category: "audio" | "image" | "pdf" | "productivity" | "video"
    file: { url: string; expiry_time: string }
  }>
}

export type PartialCommentObjectResponse = {
  // The comment object type name.
  object: "comment"
  // The ID of the comment.
  id: string
}

export type FileUploadObjectResponse = {
  object: "file_upload"
  id: string
  created_time: string
  created_by: { id: string; type: "person" | "bot" | "agent" }
  last_edited_time: string
  archived: boolean
  expiry_time: string | null
  status: "pending" | "uploaded" | "expired" | "failed"
  filename: string | null
  content_type: string | null
  content_length: number | null
  upload_url?: string
  complete_url?: string
  file_import_result?: {
    // The time the file was imported into Notion. ISO 8601 format.
    imported_time: string
  } & (
    | {
        // Indicates a successful import.
        type: "success"
        // Empty object for success type.
        success: EmptyObject
      }
    | {
        // Indicates an error occurred during import.
        type: "error"
        // Details about the error that occurred during file import.
        error: {
          // The type of error that occurred during file import.
          type:
            | "validation_error"
            | "internal_system_error"
            | "download_error"
            | "upload_error"
          // A short string code representing the error.
          code: string
          // A human-readable message describing the error.
          message: string
          // The parameter related to the error, if applicable. Null if not applicable.
          parameter: string | null
          // The HTTP status code associated with the error, if available. Null if not applicable.
          status_code: number | null
        }
      }
  )
  number_of_parts?: { total: number; sent: number }
}

type PropertyItemPropertyItemListResponse = {
  type: "property_item"
  property_item:
    | { type: "title"; title: EmptyObject; next_url: string | null; id: string }
    | {
        type: "rich_text"
        rich_text: EmptyObject
        next_url: string | null
        id: string
      }
    | {
        type: "people"
        people: EmptyObject
        next_url: string | null
        id: string
      }
    | {
        type: "relation"
        relation: EmptyObject
        next_url: string | null
        id: string
      }
    | {
        type: "rollup"
        rollup:
          | { type: "number"; number: number | null; function: RollupFunction }
          | {
              type: "date"
              date: DateResponse | null
              function: RollupFunction
            }
          | {
              type: "array"
              array: Array<EmptyObject>
              function: RollupFunction
            }
          | {
              type: "unsupported"
              unsupported: EmptyObject
              function: RollupFunction
            }
          | {
              type: "incomplete"
              incomplete: EmptyObject
              function: RollupFunction
            }
        next_url: string | null
        id: string
      }
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<PropertyItemObjectResponse>
}

export type PropertyItemListResponse = PropertyItemPropertyItemListResponse

type UserObjectResponseCommon = {
  // The ID of the user.
  id: string
  // The user object type name.
  object: "user"
  // The name of the user.
  name: string | null
  // The avatar URL of the user.
  avatar_url: string | null
}

type RichTextItemResponseCommon = {
  // All rich text objects contain an annotations object that sets the styling for the rich
  // text.
  annotations?: AnnotationResponse
  // The plain text content of the rich text object, without any styling.
  plain_text?: string | null
  // A URL that the rich text object links to or mentions.
  href?: string | null
}

type AnnotationRequest = {
  // Whether the text is formatted as bold.
  bold?: boolean
  // Whether the text is formatted as italic.
  italic?: boolean
  // Whether the text is formatted with a strikethrough.
  strikethrough?: boolean
  // Whether the text is formatted with an underline.
  underline?: boolean
  // Whether the text is formatted as code.
  code?: boolean
  // The color of the text.
  color?: ApiColor
}

type DateRequest = {
  // The start date of the date object.
  start: string
  // The end date of the date object, if any.
  end?: string | null
  // The time zone of the date object, if any.
  time_zone?: TimeZoneRequest | null
}

type TemplateMentionRequest =
  | TemplateMentionDateTemplateMentionRequest
  | TemplateMentionUserTemplateMentionRequest

type RichTextItemRequest = RichTextItemRequestCommon &
  (
    | TextRichTextItemRequest
    | MentionRichTextItemRequest
    | EquationRichTextItemRequest
  )

type InternalFileRequest = { url: string; expiry_time?: string }

type ExternalFileRequest = { url: TextRequest }

type InternalOrExternalFileWithNameRequest =
  | { file: InternalFileRequest; name: StringRequest; type?: "file" }
  | { external: ExternalFileRequest; name: StringRequest; type?: "external" }

type FileUploadIdRequest = { id: IdRequest }

type FileUploadWithOptionalNameRequest = {
  file_upload: FileUploadIdRequest
  type?: "file_upload"
  name?: StringRequest
}

type PageIconRequest =
  | { emoji: EmojiRequest; type?: "emoji" }
  | { external: ExternalFileRequest; type?: "external" }
  | {
      custom_emoji: { id: IdRequest; name?: string; url?: string }
      type?: "custom_emoji"
    }
  | { file_upload: FileUploadIdRequest; type?: "file_upload" }

type PageCoverRequest =
  | { external: ExternalFileRequest; type?: "external" }
  | { file_upload: FileUploadIdRequest; type?: "file_upload" }

type MediaContentWithUrlAndCaptionRequest = {
  url: string
  caption?: Array<RichTextItemRequest>
}

type MediaContentWithFileAndCaptionRequest =
  | {
      external: ExternalFileRequest
      type?: "external"
      caption?: Array<RichTextItemRequest>
    }
  | {
      file_upload: FileUploadIdRequest
      type?: "file_upload"
      caption?: Array<RichTextItemRequest>
    }

type MediaContentWithFileNameAndCaptionRequest =
  | {
      external: ExternalFileRequest
      type?: "external"
      caption?: Array<RichTextItemRequest>
      name?: StringRequest
    }
  | {
      file_upload: FileUploadIdRequest
      type?: "file_upload"
      caption?: Array<RichTextItemRequest>
      name?: StringRequest
    }

type TableRowRequest = {
  table_row: { cells: Array<Array<RichTextItemRequest>> }
  type?: "table_row"
  object?: "block"
}

type TableRequestWithTableRowChildren = {
  table_width: number
  children: Array<TableRowRequest>
  has_column_header?: boolean
  has_row_header?: boolean
}

export type BlockObjectRequestWithoutChildren =
  | {
      embed: MediaContentWithUrlAndCaptionRequest
      type?: "embed"
      object?: "block"
    }
  | {
      bookmark: MediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      object?: "block"
    }
  | {
      image: MediaContentWithFileAndCaptionRequest
      type?: "image"
      object?: "block"
    }
  | {
      video: MediaContentWithFileAndCaptionRequest
      type?: "video"
      object?: "block"
    }
  | {
      pdf: MediaContentWithFileAndCaptionRequest
      type?: "pdf"
      object?: "block"
    }
  | {
      file: MediaContentWithFileNameAndCaptionRequest
      type?: "file"
      object?: "block"
    }
  | {
      audio: MediaContentWithFileAndCaptionRequest
      type?: "audio"
      object?: "block"
    }
  | {
      code: {
        rich_text: Array<RichTextItemRequest>
        language: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      object?: "block"
    }
  | { equation: { expression: string }; type?: "equation"; object?: "block" }
  | { divider: EmptyObject; type?: "divider"; object?: "block" }
  | { breadcrumb: EmptyObject; type?: "breadcrumb"; object?: "block" }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      object?: "block"
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      object?: "block"
    }
  | {
      table_row: { cells: Array<Array<RichTextItemRequest>> }
      type?: "table_row"
      object?: "block"
    }
  | {
      heading_1: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
      }
      type?: "heading_1"
      object?: "block"
    }
  | {
      heading_2: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
      }
      type?: "heading_2"
      object?: "block"
    }
  | {
      heading_3: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
      }
      type?: "heading_3"
      object?: "block"
    }
  | {
      paragraph: { rich_text: Array<RichTextItemRequest>; color?: ApiColor }
      type?: "paragraph"
      object?: "block"
    }
  | {
      bulleted_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
      }
      type?: "bulleted_list_item"
      object?: "block"
    }
  | {
      numbered_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
      }
      type?: "numbered_list_item"
      object?: "block"
    }
  | {
      quote: { rich_text: Array<RichTextItemRequest>; color?: ApiColor }
      type?: "quote"
      object?: "block"
    }
  | {
      to_do: {
        rich_text: Array<RichTextItemRequest>
        checked?: boolean
        color?: ApiColor
      }
      type?: "to_do"
      object?: "block"
    }
  | {
      toggle: { rich_text: Array<RichTextItemRequest>; color?: ApiColor }
      type?: "toggle"
      object?: "block"
    }
  | {
      template: { rich_text: Array<RichTextItemRequest> }
      type?: "template"
      object?: "block"
    }
  | {
      callout: {
        rich_text: Array<RichTextItemRequest>
        icon?: PageIconRequest
        color?: ApiColor
      }
      type?: "callout"
      object?: "block"
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
      }
      type?: "synced_block"
      object?: "block"
    }

type HeaderContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  is_toggleable?: boolean
  children?: Array<BlockObjectRequestWithoutChildren>
}

type ContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  children?: Array<BlockObjectRequestWithoutChildren>
}

type BlockObjectWithSingleLevelOfChildrenRequest =
  | {
      embed: MediaContentWithUrlAndCaptionRequest
      type?: "embed"
      object?: "block"
    }
  | {
      bookmark: MediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      object?: "block"
    }
  | {
      image: MediaContentWithFileAndCaptionRequest
      type?: "image"
      object?: "block"
    }
  | {
      video: MediaContentWithFileAndCaptionRequest
      type?: "video"
      object?: "block"
    }
  | {
      pdf: MediaContentWithFileAndCaptionRequest
      type?: "pdf"
      object?: "block"
    }
  | {
      file: MediaContentWithFileNameAndCaptionRequest
      type?: "file"
      object?: "block"
    }
  | {
      audio: MediaContentWithFileAndCaptionRequest
      type?: "audio"
      object?: "block"
    }
  | {
      code: {
        rich_text: Array<RichTextItemRequest>
        language: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      object?: "block"
    }
  | { equation: { expression: string }; type?: "equation"; object?: "block" }
  | { divider: EmptyObject; type?: "divider"; object?: "block" }
  | { breadcrumb: EmptyObject; type?: "breadcrumb"; object?: "block" }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      object?: "block"
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      object?: "block"
    }
  | {
      table_row: { cells: Array<Array<RichTextItemRequest>> }
      type?: "table_row"
      object?: "block"
    }
  | {
      heading_1: HeaderContentWithSingleLevelOfChildrenRequest
      type?: "heading_1"
      object?: "block"
    }
  | {
      heading_2: HeaderContentWithSingleLevelOfChildrenRequest
      type?: "heading_2"
      object?: "block"
    }
  | {
      heading_3: HeaderContentWithSingleLevelOfChildrenRequest
      type?: "heading_3"
      object?: "block"
    }
  | {
      paragraph: ContentWithSingleLevelOfChildrenRequest
      type?: "paragraph"
      object?: "block"
    }
  | {
      bulleted_list_item: ContentWithSingleLevelOfChildrenRequest
      type?: "bulleted_list_item"
      object?: "block"
    }
  | {
      numbered_list_item: ContentWithSingleLevelOfChildrenRequest
      type?: "numbered_list_item"
      object?: "block"
    }
  | {
      quote: ContentWithSingleLevelOfChildrenRequest
      type?: "quote"
      object?: "block"
    }
  | {
      table: TableRequestWithTableRowChildren
      type?: "table"
      object?: "block"
    }
  | {
      to_do: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectRequestWithoutChildren>
        checked?: boolean
      }
      type?: "to_do"
      object?: "block"
    }
  | {
      toggle: ContentWithSingleLevelOfChildrenRequest
      type?: "toggle"
      object?: "block"
    }
  | {
      template: {
        rich_text: Array<RichTextItemRequest>
        children?: Array<BlockObjectRequestWithoutChildren>
      }
      type?: "template"
      object?: "block"
    }
  | {
      callout: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectRequestWithoutChildren>
        icon?: PageIconRequest
      }
      type?: "callout"
      object?: "block"
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
        children?: Array<BlockObjectRequestWithoutChildren>
      }
      type?: "synced_block"
      object?: "block"
    }

type ColumnWithChildrenRequest = {
  children: Array<BlockObjectWithSingleLevelOfChildrenRequest>
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
}

type ColumnBlockWithChildrenRequest = {
  column: ColumnWithChildrenRequest
  type?: "column"
  object?: "block"
}

type ColumnListRequest = { children: Array<ColumnBlockWithChildrenRequest> }

export type BlockObjectRequest =
  | {
      embed: MediaContentWithUrlAndCaptionRequest
      type?: "embed"
      object?: "block"
    }
  | {
      bookmark: MediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      object?: "block"
    }
  | {
      image: MediaContentWithFileAndCaptionRequest
      type?: "image"
      object?: "block"
    }
  | {
      video: MediaContentWithFileAndCaptionRequest
      type?: "video"
      object?: "block"
    }
  | {
      pdf: MediaContentWithFileAndCaptionRequest
      type?: "pdf"
      object?: "block"
    }
  | {
      file: MediaContentWithFileNameAndCaptionRequest
      type?: "file"
      object?: "block"
    }
  | {
      audio: MediaContentWithFileAndCaptionRequest
      type?: "audio"
      object?: "block"
    }
  | {
      code: {
        rich_text: Array<RichTextItemRequest>
        language: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      object?: "block"
    }
  | { equation: { expression: string }; type?: "equation"; object?: "block" }
  | { divider: EmptyObject; type?: "divider"; object?: "block" }
  | { breadcrumb: EmptyObject; type?: "breadcrumb"; object?: "block" }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      object?: "block"
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      object?: "block"
    }
  | {
      table_row: { cells: Array<Array<RichTextItemRequest>> }
      type?: "table_row"
      object?: "block"
    }
  | {
      table: TableRequestWithTableRowChildren
      type?: "table"
      object?: "block"
    }
  | { column_list: ColumnListRequest; type?: "column_list"; object?: "block" }
  | { column: ColumnWithChildrenRequest; type?: "column"; object?: "block" }
  | {
      heading_1: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "heading_1"
      object?: "block"
    }
  | {
      heading_2: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "heading_2"
      object?: "block"
    }
  | {
      heading_3: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "heading_3"
      object?: "block"
    }
  | {
      paragraph: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "paragraph"
      object?: "block"
    }
  | {
      bulleted_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "bulleted_list_item"
      object?: "block"
    }
  | {
      numbered_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "numbered_list_item"
      object?: "block"
    }
  | {
      quote: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "quote"
      object?: "block"
    }
  | {
      to_do: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
        checked?: boolean
      }
      type?: "to_do"
      object?: "block"
    }
  | {
      toggle: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "toggle"
      object?: "block"
    }
  | {
      template: {
        rich_text: Array<RichTextItemRequest>
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "template"
      object?: "block"
    }
  | {
      callout: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
        icon?: PageIconRequest
      }
      type?: "callout"
      object?: "block"
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "synced_block"
      object?: "block"
    }

type UpdateMediaContentWithUrlAndCaptionRequest = {
  url?: string
  caption?: Array<RichTextItemRequest>
}

type UpdateMediaContentWithFileAndCaptionRequest = {
  caption?: Array<RichTextItemRequest>
  external?: ExternalFileRequest
  file_upload?: FileUploadIdRequest
}

type UpdateMediaContentWithFileNameAndCaptionRequest = {
  caption?: Array<RichTextItemRequest>
  external?: ExternalFileRequest
  file_upload?: FileUploadIdRequest
  name?: StringRequest
}

type ExistencePropertyFilter = { is_empty: true } | { is_not_empty: true }

type TextPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | { contains: string }
  | { does_not_contain: string }
  | { starts_with: string }
  | { ends_with: string }
  | ExistencePropertyFilter

type NumberPropertyFilter =
  | { equals: number }
  | { does_not_equal: number }
  | { greater_than: number }
  | { less_than: number }
  | { greater_than_or_equal_to: number }
  | { less_than_or_equal_to: number }
  | ExistencePropertyFilter

type CheckboxPropertyFilter = { equals: boolean } | { does_not_equal: boolean }

type SelectPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | ExistencePropertyFilter

type MultiSelectPropertyFilter =
  | { contains: string }
  | { does_not_contain: string }
  | ExistencePropertyFilter

type StatusPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | ExistencePropertyFilter

type DatePropertyFilter =
  | { equals: string }
  | { before: string }
  | { after: string }
  | { on_or_before: string }
  | { on_or_after: string }
  | { this_week: EmptyObject }
  | { past_week: EmptyObject }
  | { past_month: EmptyObject }
  | { past_year: EmptyObject }
  | { next_week: EmptyObject }
  | { next_month: EmptyObject }
  | { next_year: EmptyObject }
  | ExistencePropertyFilter

type PeoplePropertyFilter =
  | { contains: IdRequest }
  | { does_not_contain: IdRequest }
  | ExistencePropertyFilter

type RelationPropertyFilter =
  | { contains: IdRequest }
  | { does_not_contain: IdRequest }
  | ExistencePropertyFilter

type FormulaPropertyFilter =
  | { string: TextPropertyFilter }
  | { checkbox: CheckboxPropertyFilter }
  | { number: NumberPropertyFilter }
  | { date: DatePropertyFilter }

type RollupSubfilterPropertyFilter =
  | { rich_text: TextPropertyFilter }
  | { number: NumberPropertyFilter }
  | { checkbox: CheckboxPropertyFilter }
  | { select: SelectPropertyFilter }
  | { multi_select: MultiSelectPropertyFilter }
  | { relation: RelationPropertyFilter }
  | { date: DatePropertyFilter }
  | { people: PeoplePropertyFilter }
  | { files: ExistencePropertyFilter }
  | { status: StatusPropertyFilter }

type RollupPropertyFilter =
  | { any: RollupSubfilterPropertyFilter }
  | { none: RollupSubfilterPropertyFilter }
  | { every: RollupSubfilterPropertyFilter }
  | { date: DatePropertyFilter }
  | { number: NumberPropertyFilter }

type PropertyFilter =
  | { title: TextPropertyFilter; property: string; type?: "title" }
  | { rich_text: TextPropertyFilter; property: string; type?: "rich_text" }
  | { number: NumberPropertyFilter; property: string; type?: "number" }
  | { checkbox: CheckboxPropertyFilter; property: string; type?: "checkbox" }
  | { select: SelectPropertyFilter; property: string; type?: "select" }
  | {
      multi_select: MultiSelectPropertyFilter
      property: string
      type?: "multi_select"
    }
  | { status: StatusPropertyFilter; property: string; type?: "status" }
  | { date: DatePropertyFilter; property: string; type?: "date" }
  | { people: PeoplePropertyFilter; property: string; type?: "people" }
  | { files: ExistencePropertyFilter; property: string; type?: "files" }
  | { url: TextPropertyFilter; property: string; type?: "url" }
  | { email: TextPropertyFilter; property: string; type?: "email" }
  | {
      phone_number: TextPropertyFilter
      property: string
      type?: "phone_number"
    }
  | { relation: RelationPropertyFilter; property: string; type?: "relation" }
  | { created_by: PeoplePropertyFilter; property: string; type?: "created_by" }
  | {
      created_time: DatePropertyFilter
      property: string
      type?: "created_time"
    }
  | {
      last_edited_by: PeoplePropertyFilter
      property: string
      type?: "last_edited_by"
    }
  | {
      last_edited_time: DatePropertyFilter
      property: string
      type?: "last_edited_time"
    }
  | { formula: FormulaPropertyFilter; property: string; type?: "formula" }
  | { unique_id: NumberPropertyFilter; property: string; type?: "unique_id" }
  | { rollup: RollupPropertyFilter; property: string; type?: "rollup" }

type TimestampCreatedTimeFilter = {
  created_time: DatePropertyFilter
  timestamp: "created_time"
  type?: "created_time"
}

type TimestampLastEditedTimeFilter = {
  last_edited_time: DatePropertyFilter
  timestamp: "last_edited_time"
  type?: "last_edited_time"
}

type PartialUserObjectRequest = {
  // The ID of the user.
  id: IdRequest
  // The user object type name.
  object?: "user"
}

type PersonInfoRequest = {
  // The email of the person.
  email?: string
}

type PersonOnlyRequest = {
  // The email of the person.
  email: string
}

type BotOwnerRequest =
  | {
      // Details about the owner of the bot, when the `type` of the owner is `user`. This means
      // the bot is for a public integration.
      user: PersonOnlyRequest | PartialUserObjectRequest
    }
  | {
      // Details about the owner of the bot, when the `type` of the owner is `workspace`. This
      // means the bot is for an internal integration.
      workspace: true
    }

type WorkspaceLimitsRequest = {
  // The maximum allowable size of a file upload, in bytes
  max_file_upload_size_in_bytes: number
}

type BotInfoRequest = {
  // Details about the owner of the bot.
  owner?: BotOwnerRequest
  // The name of the bot's workspace.
  workspace_name?: string | null
  // Limits and restrictions that apply to the bot's workspace
  workspace_limits?: WorkspaceLimitsRequest
}

type PersonUserObjectRequest = {
  type?: "person"
  // Details about the person, when the `type` of the user is `person`.
  person: PersonInfoRequest
}

type BotUserObjectRequest = {
  type?: "bot"
  // Details about the bot, when the `type` of the user is `bot`.
  bot: BotInfoRequest
}

type UserObjectRequestCommon = {
  // The ID of the user.
  id: IdRequest
  // The name of the user.
  name?: string | null
  // The user object type name.
  object?: "user"
  // The avatar URL of the user.
  avatar_url?: string | null
}

type UserObjectRequest = UserObjectRequestCommon &
  (PersonUserObjectRequest | BotUserObjectRequest)

type TemplateMentionDateTemplateMentionRequest = {
  type?: "template_mention_date"
  // The date of the template mention.
  template_mention_date: "today" | "now"
}

type TemplateMentionUserTemplateMentionRequest = {
  type?: "template_mention_user"
  // The user of the template mention.
  template_mention_user: "me"
}

type TextRichTextItemRequest = {
  type?: "text"
  // If a rich text object's type value is `text`, then the corresponding text field
  // contains an object including the text content and any inline link.
  text: {
    // The actual text content of the text.
    content: string
    // An object with information about any inline link in this text, if included.
    link?: {
      // The URL of the link.
      url: string
    } | null
  }
}

type MentionRichTextItemRequest = {
  type?: "mention"
  // Mention objects represent an inline mention of a database, date, link preview mention,
  // page, template mention, or user. A mention is created in the Notion UI when a user
  // types `@` followed by the name of the reference.
  mention:
    | {
        type?: "user"
        // Details of the user mention.
        user: PartialUserObjectRequest | UserObjectRequest
      }
    | {
        type?: "date"
        // Details of the date mention.
        date: DateRequest
      }
    | {
        type?: "page"
        // Details of the page mention.
        page: {
          // The ID of the page in the mention.
          id: IdRequest
        }
      }
    | {
        type?: "database"
        // Details of the database mention.
        database: {
          // The ID of the database in the mention.
          id: IdRequest
        }
      }
    | {
        type?: "template_mention"
        // Details of the template mention.
        template_mention: TemplateMentionRequest
      }
    | {
        type?: "custom_emoji"
        // Details of the custom emoji mention.
        custom_emoji: {
          // The ID of the custom emoji.
          id: IdRequest
          // The name of the custom emoji.
          name?: string
          // The URL of the custom emoji.
          url?: string
        }
      }
}

type EquationRichTextItemRequest = {
  type?: "equation"
  // Notion supports inline LaTeX equations as rich text objects with a type value of
  // `equation`.
  equation: {
    // A KaTeX compatible string.
    expression: string
  }
}

type RichTextItemRequestCommon = {
  // All rich text objects contain an annotations object that sets the styling for the rich
  // text.
  annotations?: AnnotationRequest
}
export type GetSelfParameters = Record<string, never>

export type GetSelfResponse = UserObjectResponse

/**
 * Retrieve your token's bot user
 */
export const getSelf = {
  method: "get",
  pathParams: [],
  queryParams: [],
  bodyParams: [],

  path: (): string => `users/me`,
} as const

type GetUserPathParameters = {
  user_id: IdRequest
}

export type GetUserParameters = GetUserPathParameters

export type GetUserResponse = UserObjectResponse

/**
 * Retrieve a user
 */
export const getUser = {
  method: "get",
  pathParams: ["user_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetUserPathParameters): string => `users/${p.user_id}`,
} as const

type ListUsersQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListUsersParameters = ListUsersQueryParameters

export type ListUsersResponse = {
  type: "user"
  user: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<UserObjectResponse>
}

/**
 * List all users
 */
export const listUsers = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `users`,
} as const

type CreatePageBodyParameters = {
  parent?:
    | { page_id: IdRequest; type?: "page_id" }
    | { database_id: IdRequest; type?: "database_id" }
    | { workspace: true; type?: "workspace" }
  properties?: Record<
    string,
    | { title: Array<RichTextItemRequest>; type?: "title" }
    | { rich_text: Array<RichTextItemRequest>; type?: "rich_text" }
    | { number: number | null; type?: "number" }
    | { url: TextRequest | null; type?: "url" }
    | {
        select:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "select"
      }
    | {
        multi_select: Array<
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
        >
        type?: "multi_select"
      }
    | {
        people: Array<
          | { id: IdRequest }
          | {
              person: { email?: string }
              id: IdRequest
              type?: "person"
              name?: string | null
              avatar_url?: string | null
              object?: "user"
            }
          | {
              bot: EmptyObject | BotInfoResponse
              id: IdRequest
              type?: "bot"
              name?: string | null
              avatar_url?: string | null
              object?: "user"
            }
        >
        type?: "people"
      }
    | { email: StringRequest | null; type?: "email" }
    | { phone_number: StringRequest | null; type?: "phone_number" }
    | { date: DateRequest | null; type?: "date" }
    | { checkbox: boolean; type?: "checkbox" }
    | { relation: Array<{ id: IdRequest }>; type?: "relation" }
    | {
        files: Array<
          | InternalOrExternalFileWithNameRequest
          | FileUploadWithOptionalNameRequest
        >
        type?: "files"
      }
    | {
        status:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "status"
      }
  >
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  content?: Array<BlockObjectRequest>
  children?: Array<BlockObjectRequest>
}

export type CreatePageParameters = CreatePageBodyParameters

export type CreatePageResponse = PageObjectResponse | PartialPageObjectResponse

/**
 * Create a page
 */
export const createPage = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "properties", "icon", "cover", "content", "children"],

  path: (): string => `pages`,
} as const

type GetPagePathParameters = {
  page_id: IdRequest
}

type GetPageQueryParameters = {
  filter_properties?: Array<string>
}

export type GetPageParameters = GetPagePathParameters & GetPageQueryParameters

export type GetPageResponse = PageObjectResponse | PartialPageObjectResponse

/**
 * Retrieve a page
 */
export const getPage = {
  method: "get",
  pathParams: ["page_id"],
  queryParams: ["filter_properties"],
  bodyParams: [],

  path: (p: GetPagePathParameters): string => `pages/${p.page_id}`,
} as const

type UpdatePagePathParameters = {
  page_id: IdRequest
}

type UpdatePageBodyParameters = {
  properties?: Record<
    string,
    | { title: Array<RichTextItemRequest>; type?: "title" }
    | { rich_text: Array<RichTextItemRequest>; type?: "rich_text" }
    | { number: number | null; type?: "number" }
    | { url: TextRequest | null; type?: "url" }
    | {
        select:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "select"
      }
    | {
        multi_select: Array<
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
        >
        type?: "multi_select"
      }
    | {
        people: Array<
          | { id: IdRequest }
          | {
              person: { email?: string }
              id: IdRequest
              type?: "person"
              name?: string | null
              avatar_url?: string | null
              object?: "user"
            }
          | {
              bot: EmptyObject | BotInfoResponse
              id: IdRequest
              type?: "bot"
              name?: string | null
              avatar_url?: string | null
              object?: "user"
            }
        >
        type?: "people"
      }
    | { email: StringRequest | null; type?: "email" }
    | { phone_number: StringRequest | null; type?: "phone_number" }
    | { date: DateRequest | null; type?: "date" }
    | { checkbox: boolean; type?: "checkbox" }
    | { relation: Array<{ id: IdRequest }>; type?: "relation" }
    | {
        files: Array<
          | InternalOrExternalFileWithNameRequest
          | FileUploadWithOptionalNameRequest
        >
        type?: "files"
      }
    | {
        status:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "status"
      }
  >
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  archived?: boolean
  in_trash?: boolean
}

export type UpdatePageParameters = UpdatePagePathParameters &
  UpdatePageBodyParameters

export type UpdatePageResponse = PageObjectResponse | PartialPageObjectResponse

/**
 * Update page properties
 */
export const updatePage = {
  method: "patch",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: ["properties", "icon", "cover", "archived", "in_trash"],

  path: (p: UpdatePagePathParameters): string => `pages/${p.page_id}`,
} as const

type GetPagePropertyPathParameters = {
  page_id: IdRequest
  property_id: string
}

type GetPagePropertyQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type GetPagePropertyParameters = GetPagePropertyPathParameters &
  GetPagePropertyQueryParameters

export type GetPagePropertyResponse =
  | PropertyItemObjectResponse
  | PropertyItemListResponse

/**
 * Retrieve a page property item
 */
export const getPageProperty = {
  method: "get",
  pathParams: ["page_id", "property_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (p: GetPagePropertyPathParameters): string =>
    `pages/${p.page_id}/properties/${p.property_id}`,
} as const

type GetBlockPathParameters = {
  block_id: IdRequest
}

export type GetBlockParameters = GetBlockPathParameters

export type GetBlockResponse = PartialBlockObjectResponse | BlockObjectResponse

/**
 * Retrieve a block
 */
export const getBlock = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

type UpdateBlockPathParameters = {
  block_id: IdRequest
}

type UpdateBlockBodyParameters =
  | {
      embed: UpdateMediaContentWithUrlAndCaptionRequest
      type?: "embed"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      bookmark: UpdateMediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      image: UpdateMediaContentWithFileAndCaptionRequest
      type?: "image"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      video: UpdateMediaContentWithFileAndCaptionRequest
      type?: "video"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      pdf: UpdateMediaContentWithFileAndCaptionRequest
      type?: "pdf"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      file: UpdateMediaContentWithFileNameAndCaptionRequest
      type?: "file"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      audio: UpdateMediaContentWithFileAndCaptionRequest
      type?: "audio"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      code: {
        rich_text?: Array<RichTextItemRequest>
        language?: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      equation: { expression: string }
      type?: "equation"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      divider: EmptyObject
      type?: "divider"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      breadcrumb: EmptyObject
      type?: "breadcrumb"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      table_row: { cells: Array<Array<RichTextItemRequest>> }
      type?: "table_row"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      heading_1: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
      }
      type?: "heading_1"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      heading_2: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
      }
      type?: "heading_2"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      heading_3: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
      }
      type?: "heading_3"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      paragraph: { rich_text: Array<RichTextItemRequest>; color?: ApiColor }
      type?: "paragraph"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      bulleted_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
      }
      type?: "bulleted_list_item"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      numbered_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
      }
      type?: "numbered_list_item"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      quote: { rich_text: Array<RichTextItemRequest>; color?: ApiColor }
      type?: "quote"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      to_do: {
        rich_text?: Array<RichTextItemRequest>
        checked?: boolean
        color?: ApiColor
      }
      type?: "to_do"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      toggle: { rich_text: Array<RichTextItemRequest>; color?: ApiColor }
      type?: "toggle"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      template: { rich_text: Array<RichTextItemRequest> }
      type?: "template"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      callout: {
        rich_text?: Array<RichTextItemRequest>
        icon?: PageIconRequest
        color?: ApiColor
      }
      type?: "callout"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
      }
      type?: "synced_block"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      table: { has_column_header?: boolean; has_row_header?: boolean }
      type?: "table"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      column: {
        // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
        // If not provided, uses an equal width.
        width_ratio?: number
      }
      type?: "column"
      archived?: boolean
      in_trash?: boolean
    }
  | { archived?: boolean; in_trash?: boolean }

export type UpdateBlockParameters = UpdateBlockPathParameters &
  UpdateBlockBodyParameters

export type UpdateBlockResponse =
  | PartialBlockObjectResponse
  | BlockObjectResponse

/**
 * Update a block
 */
export const updateBlock = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [
    "embed",
    "type",
    "archived",
    "in_trash",
    "bookmark",
    "image",
    "video",
    "pdf",
    "file",
    "audio",
    "code",
    "equation",
    "divider",
    "breadcrumb",
    "table_of_contents",
    "link_to_page",
    "table_row",
    "heading_1",
    "heading_2",
    "heading_3",
    "paragraph",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "to_do",
    "toggle",
    "template",
    "callout",
    "synced_block",
    "table",
    "column",
  ],

  path: (p: UpdateBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

type DeleteBlockPathParameters = {
  block_id: IdRequest
}

export type DeleteBlockParameters = DeleteBlockPathParameters

export type DeleteBlockResponse =
  | PartialBlockObjectResponse
  | BlockObjectResponse

/**
 * Delete a block
 */
export const deleteBlock = {
  method: "delete",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

type ListBlockChildrenPathParameters = {
  block_id: IdRequest
}

type ListBlockChildrenQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListBlockChildrenParameters = ListBlockChildrenPathParameters &
  ListBlockChildrenQueryParameters

export type ListBlockChildrenResponse = {
  type: "block"
  block: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<PartialBlockObjectResponse | BlockObjectResponse>
}

/**
 * Retrieve block children
 */
export const listBlockChildren = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (p: ListBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const

type AppendBlockChildrenPathParameters = {
  block_id: IdRequest
}

type AppendBlockChildrenBodyParameters = {
  children: Array<BlockObjectRequest>
  after?: IdRequest
}

export type AppendBlockChildrenParameters = AppendBlockChildrenPathParameters &
  AppendBlockChildrenBodyParameters

export type AppendBlockChildrenResponse = {
  type: "block"
  block: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<PartialBlockObjectResponse | BlockObjectResponse>
}

/**
 * Append block children
 */
export const appendBlockChildren = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: ["children", "after"],

  path: (p: AppendBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const

type GetDatabasePathParameters = {
  database_id: IdRequest
}

export type GetDatabaseParameters = GetDatabasePathParameters

export type GetDatabaseResponse =
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse

/**
 * Retrieve a database
 */
export const getDatabase = {
  method: "get",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetDatabasePathParameters): string => `databases/${p.database_id}`,
} as const

type UpdateDatabasePathParameters = {
  database_id: IdRequest
}

type UpdateDatabaseBodyParameters = {
  title?: Array<RichTextItemRequest>
  description?: Array<RichTextItemRequest>
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  properties?: Record<
    string,
    | {
        number: { format?: NumberFormat }
        type?: "number"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        formula: { expression?: string }
        type?: "formula"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        select: {
          options?: Array<
            | {
                id: StringRequest
                name?: TextRequest
                color?: SelectColor
                description?: TextRequest | null
              }
            | {
                name: TextRequest
                id?: StringRequest
                color?: SelectColor
                description?: TextRequest | null
              }
          >
        }
        type?: "select"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        multi_select: {
          options?: Array<
            | {
                id: StringRequest
                name?: TextRequest
                color?: SelectColor
                description?: TextRequest | null
              }
            | {
                name: TextRequest
                id?: StringRequest
                color?: SelectColor
                description?: TextRequest | null
              }
          >
        }
        type?: "multi_select"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        relation:
          | {
              single_property: EmptyObject
              database_id: IdRequest
              type?: "single_property"
            }
          | {
              dual_property: Record<string, never>
              database_id: IdRequest
              type?: "dual_property"
            }
        type?: "relation"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        rollup:
          | {
              rollup_property_name: string
              relation_property_name: string
              function: RollupFunction
              rollup_property_id?: string
              relation_property_id?: string
            }
          | {
              rollup_property_name: string
              relation_property_id: string
              function: RollupFunction
              relation_property_name?: string
              rollup_property_id?: string
            }
          | {
              relation_property_name: string
              rollup_property_id: string
              function: RollupFunction
              rollup_property_name?: string
              relation_property_id?: string
            }
          | {
              rollup_property_id: string
              relation_property_id: string
              function: RollupFunction
              rollup_property_name?: string
              relation_property_name?: string
            }
        type?: "rollup"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        unique_id: { prefix?: string | null }
        type?: "unique_id"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        title: EmptyObject
        type?: "title"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        rich_text: EmptyObject
        type?: "rich_text"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        url: EmptyObject
        type?: "url"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        people: EmptyObject
        type?: "people"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        files: EmptyObject
        type?: "files"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        email: EmptyObject
        type?: "email"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        phone_number: EmptyObject
        type?: "phone_number"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        date: EmptyObject
        type?: "date"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        checkbox: EmptyObject
        type?: "checkbox"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        created_by: EmptyObject
        type?: "created_by"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        created_time: EmptyObject
        type?: "created_time"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        last_edited_by: EmptyObject
        type?: "last_edited_by"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | {
        last_edited_time: EmptyObject
        type?: "last_edited_time"
        name?: string
        description?: PropertyDescriptionRequest | null
      }
    | { name: string }
    | null
  >
  is_inline?: boolean
  archived?: boolean
  in_trash?: boolean
}

export type UpdateDatabaseParameters = UpdateDatabasePathParameters &
  UpdateDatabaseBodyParameters

export type UpdateDatabaseResponse =
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse

/**
 * Update a database
 */
export const updateDatabase = {
  method: "patch",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [
    "title",
    "description",
    "icon",
    "cover",
    "properties",
    "is_inline",
    "archived",
    "in_trash",
  ],

  path: (p: UpdateDatabasePathParameters): string =>
    `databases/${p.database_id}`,
} as const

type QueryDatabasePathParameters = {
  database_id: IdRequest
}

type QueryDatabaseQueryParameters = {
  filter_properties?: Array<string>
}

type QueryDatabaseBodyParameters = {
  sorts?: Array<
    | { property: string; direction: "ascending" | "descending" }
    | {
        timestamp: "created_time" | "last_edited_time"
        direction: "ascending" | "descending"
      }
  >
  filter?:
    | {
        or: Array<
          | PropertyFilter
          | TimestampCreatedTimeFilter
          | TimestampLastEditedTimeFilter
          | { or: Array<PropertyFilter> }
          | { and: Array<PropertyFilter> }
        >
      }
    | {
        and: Array<
          | PropertyFilter
          | TimestampCreatedTimeFilter
          | TimestampLastEditedTimeFilter
          | { or: Array<PropertyFilter> }
          | { and: Array<PropertyFilter> }
        >
      }
    | PropertyFilter
    | TimestampCreatedTimeFilter
    | TimestampLastEditedTimeFilter
  start_cursor?: string
  page_size?: number
  archived?: boolean
  in_trash?: boolean
}

export type QueryDatabaseParameters = QueryDatabasePathParameters &
  QueryDatabaseQueryParameters &
  QueryDatabaseBodyParameters

export type QueryDatabaseResponse = {
  type: "page_or_database"
  page_or_database: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  >
}

/**
 * Query a database
 */
export const queryDatabase = {
  method: "post",
  pathParams: ["database_id"],
  queryParams: ["filter_properties"],
  bodyParams: [
    "sorts",
    "filter",
    "start_cursor",
    "page_size",
    "archived",
    "in_trash",
  ],

  path: (p: QueryDatabasePathParameters): string =>
    `databases/${p.database_id}/query`,
} as const

type ListDatabasesQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListDatabasesParameters = ListDatabasesQueryParameters

export type ListDatabasesResponse = {
  type: "database"
  database: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<PartialDatabaseObjectResponse | DatabaseObjectResponse>
}

/**
 * List databases
 */
export const listDatabases = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `databases`,
} as const

type CreateDatabaseBodyParameters = {
  parent:
    | { page_id: IdRequest; type?: "page_id" }
    | { database_id: IdRequest; type?: "database_id" }
  properties: Record<
    string,
    | {
        number: { format?: NumberFormat }
        type?: "number"
        description?: PropertyDescriptionRequest | null
      }
    | {
        formula: { expression?: string }
        type?: "formula"
        description?: PropertyDescriptionRequest | null
      }
    | {
        select: {
          options?: Array<{
            name: TextRequest
            color?: SelectColor
            description?: TextRequest | null
          }>
        }
        type?: "select"
        description?: PropertyDescriptionRequest | null
      }
    | {
        multi_select: {
          options?: Array<{
            name: TextRequest
            color?: SelectColor
            description?: TextRequest | null
          }>
        }
        type?: "multi_select"
        description?: PropertyDescriptionRequest | null
      }
    | {
        relation:
          | {
              single_property: EmptyObject
              database_id: IdRequest
              type?: "single_property"
            }
          | {
              dual_property: Record<string, never>
              database_id: IdRequest
              type?: "dual_property"
            }
        type?: "relation"
        description?: PropertyDescriptionRequest | null
      }
    | {
        rollup:
          | {
              rollup_property_name: string
              relation_property_name: string
              function: RollupFunction
              rollup_property_id?: string
              relation_property_id?: string
            }
          | {
              rollup_property_name: string
              relation_property_id: string
              function: RollupFunction
              relation_property_name?: string
              rollup_property_id?: string
            }
          | {
              relation_property_name: string
              rollup_property_id: string
              function: RollupFunction
              rollup_property_name?: string
              relation_property_id?: string
            }
          | {
              rollup_property_id: string
              relation_property_id: string
              function: RollupFunction
              rollup_property_name?: string
              relation_property_name?: string
            }
        type?: "rollup"
        description?: PropertyDescriptionRequest | null
      }
    | {
        unique_id: { prefix?: string | null }
        type?: "unique_id"
        description?: PropertyDescriptionRequest | null
      }
    | {
        title: EmptyObject
        type?: "title"
        description?: PropertyDescriptionRequest | null
      }
    | {
        rich_text: EmptyObject
        type?: "rich_text"
        description?: PropertyDescriptionRequest | null
      }
    | {
        url: EmptyObject
        type?: "url"
        description?: PropertyDescriptionRequest | null
      }
    | {
        people: EmptyObject
        type?: "people"
        description?: PropertyDescriptionRequest | null
      }
    | {
        files: EmptyObject
        type?: "files"
        description?: PropertyDescriptionRequest | null
      }
    | {
        email: EmptyObject
        type?: "email"
        description?: PropertyDescriptionRequest | null
      }
    | {
        phone_number: EmptyObject
        type?: "phone_number"
        description?: PropertyDescriptionRequest | null
      }
    | {
        date: EmptyObject
        type?: "date"
        description?: PropertyDescriptionRequest | null
      }
    | {
        checkbox: EmptyObject
        type?: "checkbox"
        description?: PropertyDescriptionRequest | null
      }
    | {
        created_by: EmptyObject
        type?: "created_by"
        description?: PropertyDescriptionRequest | null
      }
    | {
        created_time: EmptyObject
        type?: "created_time"
        description?: PropertyDescriptionRequest | null
      }
    | {
        last_edited_by: EmptyObject
        type?: "last_edited_by"
        description?: PropertyDescriptionRequest | null
      }
    | {
        last_edited_time: EmptyObject
        type?: "last_edited_time"
        description?: PropertyDescriptionRequest | null
      }
  >
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  title?: Array<RichTextItemRequest>
  description?: Array<RichTextItemRequest>
  is_inline?: boolean
}

export type CreateDatabaseParameters = CreateDatabaseBodyParameters

export type CreateDatabaseResponse =
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse

/**
 * Create a database
 */
export const createDatabase = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "parent",
    "properties",
    "icon",
    "cover",
    "title",
    "description",
    "is_inline",
  ],

  path: (): string => `databases`,
} as const

type SearchBodyParameters = {
  sort?: {
    timestamp: "last_edited_time"
    direction: "ascending" | "descending"
  }
  query?: string
  start_cursor?: string
  page_size?: number
  filter?: { property: "object"; value: "page" | "database" }
}

export type SearchParameters = SearchBodyParameters

export type SearchResponse = {
  type: "page_or_database"
  page_or_database: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  >
}

/**
 * Search by title
 */
export const search = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["sort", "query", "start_cursor", "page_size", "filter"],

  path: (): string => `search`,
} as const

type CreateCommentBodyParameters = {
  // An array of rich text objects that represent the content of the comment.
  rich_text: Array<RichTextItemRequest>
  // An array of files to attach to the comment. Maximum of 3 allowed.
  attachments?: Array<{
    // ID of a FileUpload object that has the status `uploaded`.
    file_upload_id: string
    type?: "file_upload"
  }>
} & (
  | {
      // The parent of the comment. This can be a page or a block.
      parent:
        | {
            // The ID of the parent page (with or without dashes), for example,
            // 195de9221179449fab8075a27c979105
            page_id: IdRequest
            type?: "page_id"
          }
        | {
            // The ID of the parent block (with or without dashes), for example,
            // 195de9221179449fab8075a27c979105
            block_id: IdRequest
            type?: "block_id"
          }
    }
  | {
      // The ID of the discussion to comment on.
      discussion_id: IdRequest
    }
)

export type CreateCommentParameters = CreateCommentBodyParameters

export type CreateCommentResponse =
  | PartialCommentObjectResponse
  | CommentObjectResponse

/**
 * Create a comment
 */
export const createComment = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["rich_text", "attachments", "parent", "discussion_id"],

  path: (): string => `comments`,
} as const

type ListCommentsQueryParameters = {
  // Identifier for a Notion block or page.
  block_id: IdRequest
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListCommentsParameters = ListCommentsQueryParameters

export type ListCommentsResponse = {
  type: "comment"
  comment: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<CommentObjectResponse>
}

/**
 * List comments
 */
export const listComments = {
  method: "get",
  pathParams: [],
  queryParams: ["block_id", "start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `comments`,
} as const

type CreateFileUploadBodyParameters = {
  // How the file is being sent. Use `multi_part` for files larger than 20MB. Use
  // `external_url` for files that are temporarily hosted publicly elsewhere. Default is
  // `single_part`.
  mode?: "single_part" | "multi_part" | "external_url"
  // Name of the file to be created. Required when `mode` is `multi_part`. Otherwise
  // optional, and used to override the filename. Must include an extension, or have one
  // inferred from the `content_type` parameter.
  filename?: string
  // MIME type of the file to be created. Recommended when sending the file in multiple
  // parts. Must match the content type of the file that's sent, and the extension of the
  // `filename` parameter if any.
  content_type?: string
  // When `mode` is `multi_part`, the number of parts you are uploading. This must match
  // the number of parts as well as the final `part_number` you send.
  number_of_parts?: number
  // When `mode` is `external_url`, provide the HTTPS URL of a publicly accessible file to
  // import into your workspace.
  external_url?: string
}

export type CreateFileUploadParameters = CreateFileUploadBodyParameters

export type CreateFileUploadResponse = FileUploadObjectResponse

/**
 * Create a file upload
 */
export const createFileUpload = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "mode",
    "filename",
    "content_type",
    "number_of_parts",
    "external_url",
  ],

  path: (): string => `file_uploads`,
} as const

type ListFileUploadsQueryParameters = {
  // If supplied, the endpoint will return file uploads with the specified status.
  status?: "pending" | "uploaded" | "expired" | "failed"
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListFileUploadsParameters = ListFileUploadsQueryParameters

export type ListFileUploadsResponse = {
  type: "file_upload"
  file_upload: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<FileUploadObjectResponse>
}

/**
 * List file uploads
 */
export const listFileUploads = {
  method: "get",
  pathParams: [],
  queryParams: ["status", "start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `file_uploads`,
} as const

type SendFileUploadPathParameters = {
  // Identifier for a Notion file upload object.
  file_upload_id: IdRequest
}

type SendFileUploadFormDataParameters = {
  file: { filename?: string; data: string | Blob }
  part_number?: string
}

export type SendFileUploadParameters = SendFileUploadPathParameters &
  SendFileUploadFormDataParameters

export type SendFileUploadResponse = FileUploadObjectResponse

/**
 * Upload a file
 */
export const sendFileUpload = {
  method: "post",
  pathParams: ["file_upload_id"],
  queryParams: [],
  bodyParams: [],
  formDataParams: ["file", "part_number"],
  path: (p: SendFileUploadPathParameters): string =>
    `file_uploads/${p.file_upload_id}/send`,
} as const

type CompleteFileUploadPathParameters = {
  // Identifier for a Notion file upload object.
  file_upload_id: IdRequest
}

export type CompleteFileUploadParameters = CompleteFileUploadPathParameters

export type CompleteFileUploadResponse = FileUploadObjectResponse

/**
 * Complete a multi-part file upload
 */
export const completeFileUpload = {
  method: "post",
  pathParams: ["file_upload_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: CompleteFileUploadPathParameters): string =>
    `file_uploads/${p.file_upload_id}/complete`,
} as const

type GetFileUploadPathParameters = {
  // Identifier for a Notion file upload object.
  file_upload_id: IdRequest
}

export type GetFileUploadParameters = GetFileUploadPathParameters

export type GetFileUploadResponse = FileUploadObjectResponse

/**
 * Retrieve a file upload
 */
export const getFileUpload = {
  method: "get",
  pathParams: ["file_upload_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetFileUploadPathParameters): string =>
    `file_uploads/${p.file_upload_id}`,
} as const

type OauthTokenBodyParameters = {
  grant_type: string
  code: string
  redirect_uri?: string
  external_account?: { key: string; name: string }
}

export type OauthTokenParameters = OauthTokenBodyParameters

export type OauthTokenResponse = {
  access_token: string
  token_type: "bearer"
  bot_id: string
  workspace_icon: string | null
  workspace_name: string | null
  workspace_id: string
  owner:
    | {
        type: "user"
        user:
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | PartialUserObjectResponse
      }
    | { type: "workspace"; workspace: true }
  duplicated_template_id: string | null
  request_id?: string
}

/**
 * Exchange an authorization code for an access token
 */
export const oauthToken = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["grant_type", "code", "redirect_uri", "external_account"],

  path: (): string => `oauth/token`,
} as const

type OauthRevokeBodyParameters = { token: string }

export type OauthRevokeParameters = OauthRevokeBodyParameters

export type OauthRevokeResponse = { request_id?: string }

/**
 * Revoke a token
 */
export const oauthRevoke = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["token"],

  path: (): string => `oauth/revoke`,
} as const

type OauthIntrospectBodyParameters = { token: string }

export type OauthIntrospectParameters = OauthIntrospectBodyParameters

export type OauthIntrospectResponse = {
  active: boolean
  scope?: string
  iat?: number
  request_id?: string
}

/**
 * Introspect a token
 */
export const oauthIntrospect = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["token"],

  path: (): string => `oauth/introspect`,
} as const
