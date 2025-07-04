// tslint:disable: no-var-keyword prefer-const object-literal-shorthand

// from https://developers.google.com/apps-script/overview
function createAndSendDocument() {
    // Create a new Google Doc named 'Hello, world!'
    var doc = DocumentApp.create("Hello, world!");

    // Access the body of the document, then add a paragraph.
    doc.getBody().appendParagraph("This document was created by Google Apps Script.");

    // Get the URL of the document.
    var url = doc.getUrl();

    // Get the email address of the active user - that's you.
    var email = Session.getActiveUser().getEmail();

    // Get the name of the document to use as an email subject line.
    var subject = doc.getName();

    // Append a new string to the "url" variable to use as an email body.
    var body = "Link to your doc: " + url;

    // Send yourself an email with a link to the document.
    GmailApp.sendEmail(email, subject, body);
}

// Regression
ScriptApp.getService().getUrl();
CalendarApp.GuestStatus.NO;

// test for URLFetchRequestOptions.payload
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
const postTest = (payload: object): string => {
    const url = "http://httpbin.org/post";
    const params: URLFetchRequestOptions = {
        method: "post",
        payload: payload,
    };
    return UrlFetchApp.fetch(url, params).getContentText();
};

// Test CalendarApp.EventType
const testCalendarAppEventType = (): void => {
    const event = CalendarApp.getEventById("testevent");
    const type = event.getEventType();
    const birthdayType = CalendarApp.EventType.BIRTHDAY;
    birthdayType !== type;

    type !== CalendarApp.EventType.FOCUS_TIME;

    type == GoogleAppsScript.Calendar.EventType.OUT_OF_OFFICE;
    // @ts-expect-error
    type == GoogleAppsScript.Calendar.EventType.STANDARD;
};

// Advanced Services
Slides.Presentations.Pages.getThumbnail("presentationId", "pageId");

// Calendar (Advanced service)
const createEvent = (): GoogleAppsScript.Calendar.Schema.Event => {
    const calendarId = "primary";
    const start = new Date();
    const end = new Date();
    start.setHours(10);
    end.setHours(11);
    let event: GoogleAppsScript.Calendar.Schema.Event = {
        summary: "Lunch Meeting",
        location: "The Deli",
        description: "To discuss our plans for the presentation next week.",
        start: {
            dateTime: start.toISOString(),
        },
        end: {
            dateTime: end.toISOString(),
        },
        attendees: [{ email: "alice@example.com" }, { email: "bob@example.com" }],
        // Red background. Use Calendar.Colors.get() for the full list.
        colorId: "11",
        eventType: "default",
    };
    event = Calendar.Events.insert(event, calendarId);
    Logger.log("Event ID: " + event.id);

    return event;
};

// Calendar Working Locations (Advanced Service)
const createWorkingLocationEvent = (): void => {
    const calendarId = "primary";
    const start = new Date();
    const end = new Date();
    start.setHours(10);
    end.setHours(11);
    let event: GoogleAppsScript.Calendar.Schema.Event = {
        creator: { self: true, email: "alice@example.com" },
        workingLocationProperties: {
            officeLocation: {
                buildingId: "The-Office",
                label: "The-Office",
            },
            type: "officeLocation",
        },
        kind: "calendar#event",
        summary: "The-Office (Office)",
        visibility: "public",
        transparency: "transparent",
        created: "2023-05-30T14:47:58.000Z",
        originalStartTime: { date: "2023-09-25" },
        eventType: "workingLocation",
        organizer: { email: "bob@example.com", self: true },
        start: {
            date: "2023-09-25",
        },
        end: {
            date: "2023-09-26",
        },
    };
    event = Calendar.Events.insert(event, calendarId);
    Logger.log("Event ID: " + event.id);
};

// Admin Directory (Advanced service)
const listAllUsers = () => {
    let pageToken: string;
    let page: GoogleAppsScript.AdminDirectory.Schema.Users;
    do {
        page = AdminDirectory.Users.list({
            domain: "example.com",
            orderBy: "givenName",
            maxResults: 100,
            pageToken: pageToken,
        });
        const users: GoogleAppsScript.AdminDirectory.Schema.User[] = page.users;
        if (users) {
            for (const user of users) {
                Logger.log("%s (%s)", user.name.fullName, user.primaryEmail);
            }
        } else {
            Logger.log("No users found.");
        }
        pageToken = page.nextPageToken;
    } while (pageToken);
};

// Admin Directory - User Organization
const listAllUserOrganizations = () => {
    let pageToken: string;
    let page: GoogleAppsScript.AdminDirectory.Schema.Users;
    do {
        page = AdminDirectory.Users.list({
            domain: "example.com",
            orderBy: "givenName",
            maxResults: 100,
            pageToken: pageToken,
            viewType: "domain_public",
        });
        const users: GoogleAppsScript.AdminDirectory.Schema.User[] = page.users;
        if (users) {
            for (const user of users) {
                Logger.log(
                    "%s: %s - %s)",
                    user.name.fullName,
                    user.organizations[0].location,
                    user.organizations[0].department,
                );
            }
        } else {
            Logger.log("No users found.");
        }
        pageToken = page.nextPageToken;
    } while (pageToken);
};

// doPost function
function doPost(e: GoogleAppsScript.Events.DoPost) {
    const path: string = e.pathInfo;
    const data: string = e.postData.contents;
    const param: string = e.parameter.param;
    const paramArray: string[] = e.parameters.param;
    Logger.log(path);
    Logger.log(JSON.parse(data));
    Logger.log(param);
    Logger.log(paramArray);
}

// doGet function
function doGet(e: GoogleAppsScript.Events.DoGet) {
    const path: string = e.pathInfo;
    const param: string = e.parameter.param;
    const paramArray: string[] = e.parameters.param;
    Logger.log(path);
    Logger.log(param);
    Logger.log(paramArray);
}

// Base Service
function createFileFromBlob(blob: GoogleAppsScript.Base.Blob) {
    const file: GoogleAppsScript.Drive.File = DriveApp.createFile(blob);
}

// Console
console.log("log");
console.info("info");
console.warn("warn");
console.error("error");
console.log("Console can use %s and %d format string.", "hello", 2);

// Data Studio Request
const request: GoogleAppsScript.Data_Studio.Request<any> = {
    configParams: {
        my_param: "my_param_value",
    },
    dateRange: {
        endDate: "2019-09-14",
        startDate: "2019-07-14",
    },
    scriptParams: {
        lastRefresh: "1569292983027",
    },
    fields: [
        {
            name: "my_field_name",
        },
    ],
    dimensionsFilters: [
        [
            {
                fieldName: "my_field_name",
                values: ["my_value"],
                type: "INCLUDE",
                operator: "IN_LIST",
            },
        ],
    ],
};

// Spreadsheet Rich Text Value & Builder
// starting with sample code from
// https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value-builder
const richTextStyle = SpreadsheetApp.newTextStyle().setUnderline(false).build();
const richTextValue = SpreadsheetApp.newRichTextValue()
    .setText("foo no baz")
    .setLinkUrl(0, 3, "https://bar.foo")
    .setLinkUrl(7, 10, "https://abc.xyz")
    .setTextStyle(7, 10, richTextStyle)
    .build();
for (let richTextRun of richTextValue.getRuns()) {
    let start = richTextRun.getStartIndex();
    let end = richTextRun.getEndIndex();
    let newValueBuilder = SpreadsheetApp.newRichTextValue();
    if (richTextRun.getTextStyle() === richTextValue.getTextStyle(start, end)) {
        newValueBuilder = richTextRun.copy();
    }
    if (richTextRun.getLinkUrl() === richTextValue.getLinkUrl(start, end)) {
        newValueBuilder.setLinkUrl(richTextRun.getLinkUrl());
    }
    if (richTextRun.getTextStyle() === richTextValue.getTextStyle(start, end)) {
        newValueBuilder.setTextStyle(richTextRun.getTextStyle());
    }
    // $ExpectType string
    newValueBuilder.build().getText();
}

// TextStyle - get/setForegroundColorObject
// Build an RGB color object
// $ExpectType Color
const colorObjRgb = SpreadsheetApp.newColor().setRgbColor("red").build();

// Build a Theme color object
// $ExpectType Color
const colorObjTheme = SpreadsheetApp.newColor().setThemeColor(SpreadsheetApp.ThemeColorType.ACCENT1).build();

// Build TextStyle objects for Rgb, Theme, and null
// $ExpectType TextStyle
const rgbTextStyle = SpreadsheetApp.newTextStyle().setForegroundColorObject(colorObjRgb).build();

// $ExpectType TextStyle
const themeTextStyle = SpreadsheetApp.newTextStyle().setForegroundColorObject(colorObjTheme).build();

// $ExpectType TextStyle
const nullTextStyle = SpreadsheetApp.newTextStyle().build();

// Null Color Test
// $ExpectType Color
const nullColorObj = nullTextStyle.getForegroundColorObject();
Logger.log(nullColorObj); // null

// RgbColor Test
// $ExpectType Color
const rgbColorObj = rgbTextStyle.getForegroundColorObject();
Logger.log(rgbColorObj); // Color
Logger.log(rgbColorObj.getColorType()); // RGB
Logger.log(rgbColorObj.asRgbColor().asHexString()); // #ff0000
Logger.log(rgbColorObj.asRgbColor().getBlue()); // 0
Logger.log(rgbColorObj.asRgbColor().getGreen()); // 0
Logger.log(rgbColorObj.asRgbColor().getRed()); // 255

// ThemeColor Test
// $ExpectType Color
const themeColorObj = themeTextStyle.getForegroundColorObject();
Logger.log(themeColorObj); // Color
Logger.log(themeColorObj.getColorType()); // THEME
Logger.log(themeColorObj.asThemeColor().getThemeColorType()); // ACCENT1

const tableCell = DocumentApp.create("").getCursor().getElement().asTableCell();
tableCell.getParentRow().getChildIndex(tableCell);

XmlService.createElement("")
    .addContent(XmlService.createCdata(""))
    .addContent(XmlService.createComment(""))
    .addContent(XmlService.createDocType(""))
    .addContent(XmlService.createText(""));

const createFolderAndGetDescription = () => {
    // Create folder.
    const folder = DriveApp.createFolder("MyFolder");
    // Get description. Expect null.
    Logger.log(folder.getDescription());
    // Set description.
    folder.setDescription("desc");
    // Get description. Expect 'DESC'.
    Logger.log(folder.getDescription().toUpperCase());
};

function onChange(e: GoogleAppsScript.Events.SheetsOnChange) {
    if (e.changeType === "FORMAT") {
        console.log("Formatting change detected");
    }
    const sheetName = e.source?.getSheetName();
    console.log(sheetName);
    if (sheetName !== undefined) {
        console.log("Success to get e.source field");
    }
}

const createFileAndGetDescription = () => {
    // Create file.
    const file = DriveApp.createFile("New Text File", "Hello, world!");
    // Get description. Expect null.
    Logger.log(file.getDescription());
    // Set description.
    file.setDescription("desc");
    // Get description. Expect 'DESC'.
    Logger.log(file.getDescription().toUpperCase());
};

function timeDriven(e: GoogleAppsScript.Events.TimeDriven) {
    if (typeof e.hour === "number") {
        console.log("Time driven event detected");
    }
}

CardService.newTextButton().setAltText("alt text"); // $ExpectType TextButton

CardService.newLinkPreview().setTitle("Smart chip title"); // $ExpectType LinkPreview

CardService.newDecoratedText(); // $ExpectType DecoratedText
CardService.newDecoratedText().setAuthorizationAction(CardService.newAuthorizationAction()); // $ExpectType DecoratedText
CardService.newDecoratedText().setBottomLabel(""); // $ExpectType DecoratedText
CardService.newDecoratedText().setButton(CardService.newTextButton()); // $ExpectType DecoratedText
CardService.newDecoratedText().setComposeAction(CardService.newAction(), CardService.ComposedEmailType.REPLY_AS_DRAFT); // $ExpectType DecoratedText
CardService.newDecoratedText().setIcon(CardService.Icon.AIRPLANE); // $ExpectType DecoratedText
CardService.newDecoratedText().setIconAltText(""); // $ExpectType DecoratedText
CardService.newDecoratedText().setIconUrl(""); // $ExpectType DecoratedText
CardService.newDecoratedText().setOnClickAction(CardService.newAction()); // $ExpectType DecoratedText
CardService.newDecoratedText().setOnClickOpenLinkAction(CardService.newAction()); // $ExpectType DecoratedText
CardService.newDecoratedText().setOpenLink(CardService.newOpenLink()); // $ExpectType DecoratedText
CardService.newDecoratedText().setSwitchControl(CardService.newSwitch()); // $ExpectType DecoratedText
CardService.newDecoratedText().setText(""); // $ExpectType DecoratedText
CardService.newDecoratedText().setTopLabel(""); // $ExpectType DecoratedText
CardService.newDecoratedText().setWrapText(true); // $ExpectType DecoratedText

CardService.newDivider(); // $ExpectType Divider

CardService.newTimePicker(); // $ExpectType TimePicker
CardService.newTimePicker().setFieldName(""); // $ExpectType TimePicker
CardService.newTimePicker().setHours(0); // $ExpectType TimePicker
CardService.newTimePicker().setMinutes(0); // $ExpectType TimePicker
CardService.newTimePicker().setOnChangeAction(CardService.newAction()); // $ExpectType TimePicker
CardService.newTimePicker().setTitle(""); // $ExpectType TimePicker

// CardService.newCardBuilder().setDisplayStyle(CardService.DisplayStyle.PEEK)
CardService.DisplayStyle.PEEK;
CardService.DisplayStyle.REPLACE;

CardService.OnClose.NOTHING;
CardService.OnClose.RELOAD;
CardService.OnClose.RELOAD_ADD_ON;

CardService.newOpenLink(); // $ExpectType OpenLink
CardService.newOpenLink().setOnClose(CardService.OnClose.NOTHING); // $ExpectType OpenLink
CardService.newOpenLink().setOnClose(CardService.OnClose.RELOAD); // $ExpectType OpenLink
CardService.newOpenLink().setOnClose(CardService.OnClose.RELOAD_ADD_ON); // $ExpectType OpenLink

DriveApp.createShortcut("").getTargetId();
DriveApp.createFile("", "").moveTo(DriveApp.getFolderById(""));

// Addon event objects tests:

const handleCalendarAction = (e: GoogleAppsScript.Addons.EventObject) => {
    const {
        calendar: { attendees, calendarId, recurringEventId },
    } = e;

    // $ExpectType Calendar
    const cal = CalendarApp.getCalendarById(calendarId);

    // $ExpectType CalendarEvent
    const ev = cal.getEventById(recurringEventId);

    // $ExpectType string[]
    const attends: Array<(typeof attendees)[number]["displayName"]> = ev.getGuestList().map((guest) => guest.getName());

    console.log({ attends });

    const eventInfo: Partial<GoogleAppsScript.Addons.CalendarEventObject> = {
        calendarId: cal.getId(),
        recurringEventId: ev.getId(),
        capabilities: {
            canAddAttendees: ev.guestsCanInviteOthers(),
            canSeeAttendees: ev.guestsCanSeeGuests(),
            canSeeConferenceData: false,
            canSetConferenceData: false,
            conferenceData: {
                conferenceId: "12345",
                entryPoints: [
                    {
                        accessCode: "access",
                        entryPointFeatures: ["toll", "toll_free"],
                        entryPointType: "phone",
                        label: "MyEntry",
                        meetingCode: "meeting",
                        passcode: "pass",
                        password: "12M$q_5",
                        pin: "50193",
                        uri: "tel:123456",
                        regionCode: "en-US",
                    },
                ],
                notes: "My notes about the conference",
                conferenceSolution: {
                    iconUri: "https://hostname/path/image.jpeg",
                    key: {
                        type: "hangoutsMeet",
                    },
                    name: "MyConference",
                },
                parameters: {
                    addOnParameters: {
                        test: "value",
                        attends: "5",
                    },
                },
            },
        },
        id: ev.getId(),
        organizer: {
            email: ev.getCreators()[0],
        },
    };

    console.log(eventInfo);

    const [firstGuest] = ev.getGuestList();

    const guestInfo: Partial<GoogleAppsScript.Addons.AttendeeObject> = {
        email: firstGuest.getEmail(),
        additionalGuests: firstGuest.getAdditionalGuests(),
        displayName: firstGuest.getName(),
    };

    console.log(guestInfo);
};

const handleDocsAction = (e: GoogleAppsScript.Addons.EventObject) => {
    const {
        docs: { addonHasFileScopePermission, id, title },
    } = e;

    if (addonHasFileScopePermission) {
        console.log(`${id} - ${title}`);
    }
};

const handleDriveAction = (e: GoogleAppsScript.Addons.EventObject) => {
    const {
        drive: { activeCursorItem, selectedItems },
    } = e;

    const includeHash: { [title: string]: 0 | 1 } = { myTitle: 1 };

    // $ExpectType DriveItemObject[]
    [activeCursorItem, ...selectedItems].filter(({ addonHasFileScopePermission, iconUrl, id, mimeType, title }) => {
        // $ExpectType File
        const file = DriveApp.getFileById(id);

        const mimeOk = file.getMimeType() === mimeType;

        const hasIcon = iconUrl !== "";

        return mimeOk && hasIcon && addonHasFileScopePermission && includeHash[title];
    });
};

const handleGmailAction = (e: GoogleAppsScript.Addons.EventObject) => {
    const {
        gmail: { messageId, threadId, bccRecipients = [], ccRecipients = [], toRecipients = [] },
    } = e;

    GmailApp.getMessageById(messageId);
    GmailApp.getThreadById(threadId);

    toRecipients.forEach((to, idx) => console.log({ to, idx }));

    bccRecipients.map((bcc, idx) => `bcc${idx}: ${bcc}`);

    ccRecipients.map((cc, idx) => `cc${idx}: ${cc}`);
};

const handleSheetsAction = (e: GoogleAppsScript.Addons.EventObject) => {
    const {
        sheets: { addonHasFileScopePermission, id, title },
    } = e;

    // $ExpectType Spreadsheet
    const spreadsheet = SpreadsheetApp.openById(id);

    const sheetsInfo: Partial<GoogleAppsScript.Addons.SheetsEventObject> = {
        addonHasFileScopePermission,
        id: spreadsheet.getId(),
        title: spreadsheet.getName(),
    };

    const isTitleCorrect = sheetsInfo.title === title;
    console.log({ isTitleCorrect });
};

const handleSlidesAction = (e: GoogleAppsScript.Addons.EventObject) => {
    const {
        slides: { addonHasFileScopePermission, id, title },
    } = e;

    const presentation = SlidesApp.openById(id);

    const slidesInfo: Partial<GoogleAppsScript.Addons.SlidesEventObject> = {
        addonHasFileScopePermission,
        id: presentation.getId(),
        title: presentation.getName(),
    };

    const isTitleOk = (slidesInfo.title = title);
    console.log({ isTitleOk });
};

const handleCommonAction = (e: GoogleAppsScript.Addons.EventObject) => {
    const {
        commonEventObject: { formInputs, hostApp, parameters, platform, timeZone, userLocale },
    } = e;

    const plaformMap: { [P in GoogleAppsScript.Addons.Platform]: string } = {
        ANDROID: "Android",
        IOS: "iOS",
        WEB: "Web",
    };

    const hostMap: {
        [P in GoogleAppsScript.Addons.HostApplication]: (e: GoogleAppsScript.Addons.EventObject) => void;
    } = {
        CALENDAR: handleCalendarAction,
        DOCS: handleDocsAction,
        DRIVE: handleDriveAction,
        GMAIL: handleGmailAction,
        SHEETS: handleSheetsAction,
        SLIDES: handleSlidesAction,
    };

    try {
        hostMap[hostApp](e);

        const now = new Date();
        const formattedDate = Utilities.formatDate(now, timeZone.id, "MM/dd/yyyy");
        const formattedTime = Utilities.formatDate(now, timeZone.id, "hh:mm a");

        Object.keys(formInputs).forEach((id) => {
            const {
                // V8
                dateInput,
                dateTimeInput,
                stringInputs,
                timeInput,
                // Rhino
                "": {
                    dateInput: dateInputRhino,
                    dateTimeInput: dateTimeInputRhino,
                    stringInputs: stringInputsRhino,
                    timeInput: timeInputRhino,
                },
            } = formInputs[id];

            if (dateInput || dateInputRhino) {
                parameters.modifiedAt = dateInput?.msSinceEpoch || dateInputRhino?.msSinceEpoch;
            }

            if (dateTimeInput || dateTimeInputRhino) {
                parameters.modifiedAt = dateTimeInput?.msSinceEpoch || dateTimeInputRhino?.msSinceEpoch;
            }

            if (stringInputs || stringInputsRhino) {
                parameters.emails = JSON.stringify(stringInputs?.value || stringInputsRhino?.value);
            }

            if (timeInput || timeInputRhino) {
                const { hours, minutes } = timeInput || timeInputRhino;
                parameters.startsAt = `${hours}:${minutes}`;
            }
        });

        const props = PropertiesService.getUserProperties();
        props.setProperties(parameters);

        console.log(`Processed on ${formattedDate} at ${formattedTime} | ${userLocale}`);
    } catch ({ name, message }) {
        const type = plaformMap[platform];
        console.warn(`Platform: ${type}
        Type: ${name}
        Details: ${message}
        `);
    }
};

const fileSecurityUpdateInfo = () => {
    // get file
    const file = DriveApp.getFileById("");
    // get resource key
    Logger.log(file.getResourceKey());

    // update flag for update enabled
    if (file.getSecurityUpdateEligible() && !file.getSecurityUpdateEnabled()) {
        file.setSecurityUpdateEnabled(true);
    }
};
const folderSecurityUpdateInfo = () => {
    // get folder
    const folder = DriveApp.getFolderById("");
    // get resource key
    Logger.log(folder.getResourceKey());

    // update flag for update enabled
    if (folder.getSecurityUpdateEligible() && !folder.getSecurityUpdateEnabled()) {
        folder.setSecurityUpdateEnabled(true);
    }
};

interface BorderStyleOptions {
    color: string;
    radius: number;
}

interface ImageComponentOptions extends BorderStyleOptions {
    alt: string;
    src: string;
}

interface GridItemOptions extends ImageComponentOptions {
    id: string;
    title: string;
    subtitle: string;
}

interface GridOptions extends BorderStyleOptions {
    items: GoogleAppsScript.Card_Service.GridItem[];
}

const makeBorderStyle = ({ color, radius }: BorderStyleOptions) => {
    // $ExpectType BorderStyle
    const style = CardService.newBorderStyle();
    style.setCornerRadius(radius).setStrokeColor(color).setType(CardService.BorderType.STROKE);

    return style;
};

const makeImageCropStyle = (ratio: number) => {
    // $ExpectType ImageCropStyle
    const style = CardService.newImageCropStyle();
    style.setAspectRatio(ratio).setImageCropType(CardService.ImageCropType.CIRCLE);

    return style;
};

const makeImageComponent = ({ alt, src, ...options }: ImageComponentOptions) => {
    // $ExpectType ImageComponent
    const img = CardService.newImageComponent();
    img.setAltText(alt).setBorderStyle(makeBorderStyle(options)).setCropStyle(makeImageCropStyle(42)).setImageUrl(src);

    return img;
};

const makeGridItem = ({ id, subtitle, title, ...options }: GridItemOptions) => {
    // $ExpectType GridItem
    const item = CardService.newGridItem();
    item.setIdentifier(id)
        .setImage(makeImageComponent(options))
        .setLayout(CardService.GridItemLayout.TEXT_BELOW)
        .setSubtitle(subtitle)
        .setTextAlignment(CardService.HorizontalAlignment.CENTER)
        .setTitle(title);

    return item;
};

const makeGrid = ({ items, ...options }: GridOptions) => {
    // $ExpectType Grid
    const grid = CardService.newGrid();
    items.forEach((item) => grid.addItem(item));

    const action = CardService.newAction();
    action.setFunctionName("somefunc");

    grid.setOnClickAction(action).setBorderStyle(makeBorderStyle(options)).setNumColumns(2).setTitle("My Grid");

    return grid;
};

const handleScopeAction = () => {
    // $ExpectType EditorFileScopeActionResponseBuilder
    const builder = CardService.newEditorFileScopeActionResponseBuilder();
    builder.requestFileScopeForActiveDocument();

    // $ExpectType EditorFileScopeActionResponse
    const response = builder.build();

    // $ExpectType string
    const serialized = response.printJson();

    return serialized;
};

// Analytics Test
const requestAnalyticsData = (): string => {
    const gaData = Analytics.Data.Ga.get("An Id", "2022-01-18", "2022-01-18", "Some metrics", {
        dimensions: "Some dimensions",
    });

    const totalsForAllResults = gaData.totalsForAllResults;
    const totalSessions = totalsForAllResults["ga:sessions"];

    return totalSessions;
};

// Example of adding an attachment to a calendar event.
const onItemSelected = () => {
    // $ExpectType Attachment
    const attachment = CardService.newAttachment()
        .setResourceUrl("https://example.com")
        .setTitle("My Attachment")
        .setMimeType("text/html")
        .setIconUrl("https://example.com/icon.png");

    // $ExpectType CalendarEventActionResponseBuilder
    CardService.newCalendarEventActionResponseBuilder().addAttachments([attachment]);
};

SlidesApp.getActivePresentation().getSlides()[0].setSkipped(true);

// Examples for form app validation builders:

// Example of building a text validation
const formAppTextValidation = FormApp.createTextValidation()
    .requireNumberBetween(1, 100)
    .setHelpText("Please be between 1 and 100")
    .build();

// Example of building a grid validation
const formAppGridValidation = FormApp.createGridValidation()
    .requireLimitOneResponsePerColumn()
    .setHelpText("You did it wrong")
    .build();

// Example of building a grid validation
const formAppCheckboxGridValidation = FormApp.createCheckboxGridValidation()
    .requireLimitOneResponsePerColumn()
    .setHelpText("This is not fine")
    .build();

// Example of building a checkbox validation
const formAppCheckboxValidation = FormApp.createCheckboxValidation()
    .requireSelectAtLeast(1)
    .setHelpText("Select one pls")
    .build();

// Example of building a paragraph text validation
const formAppParagraphTextValidation = FormApp.createParagraphTextValidation()
    .requireTextDoesNotContainPattern("string")
    .setHelpText("Hey! You put a string in your string!")
    .build();

const mimeTypes: string[] = [MimeType.GOOGLE_APPS_SCRIPT];

// analytics reporting test
const analyticsReporting = () => {
    const gaData = AnalyticsReporting.Reports.batchGet({
        reportRequests: [
            {
                viewId: "",
                dateRanges: [
                    {
                        startDate: "2023-03-08",
                        endDate: "2023-03-08",
                    },
                ],
                metrics: [
                    {
                        expression: "some metrics",
                        alias: "some metrics",
                        formattingType: "some metrics",
                    },
                ],
                dimensions: [
                    {
                        name: "some dimensions",
                    },
                ],
                samplingLevel: "LARGE",
            },
        ],
    });
};

// Spreadsheet Drawing test
const sheetDrawing = () => {
    const sheet = SpreadsheetApp.getActiveSheet();
    const drawing = sheet.getDrawings()[0];
    // get methods
    drawing.getContainerInfo();
    drawing.getHeight();
    drawing.getOnAction();
    drawing.getSheet();
    drawing.getWidth();
    drawing.getZIndex();
    // set methods
    drawing.setHeight(100);
    drawing.setOnAction("functionName");
    drawing.setPosition(0, 0, 10, 10);
    drawing.setWidth(100);
    drawing.setZIndex(100);
    // delete drawing
    drawing.remove();
};

// Font Color objects
const sheetFontColorObjects = () => {
    const sheet = SpreadsheetApp.getActiveSheet();
    // Test for a single cell
    const singleBuilder = SpreadsheetApp.newColor().setRgbColor("#808080").build();
    sheet.getRange("A1").setFontColorObject(singleBuilder);
    // Test for multiple cells
    const multipleBuilders = [
        [
            SpreadsheetApp.newColor().setRgbColor("#000000").build(),
            SpreadsheetApp.newColor().setRgbColor("#800000").build(),
        ],
        [
            SpreadsheetApp.newColor().setRgbColor("#008000").build(),
            SpreadsheetApp.newColor().setRgbColor("#000080").build(),
        ],
    ];
    sheet.getRange("A1:B2").setFontColorObjects(multipleBuilders);
};

const utilitiesParseDate = () => {
    Utilities.parseDate("2022/01/01", "GMT", "yyyy/MM/dd");
};

// Spreadsheet Cell Image test
const sheetCellImage = () => {
    const imageBuilder = SpreadsheetApp.newCellImage();
    // set methods
    imageBuilder.setAltTextTitle("Title");
    imageBuilder.setAltTextDescription("Description");
    imageBuilder.setSourceUrl("https://hostname/path/image.jpeg");
    // get methods
    imageBuilder.getAltTextTitle();
    imageBuilder.getAltTextDescription();
    imageBuilder.getContentUrl();
    imageBuilder.getUrl();

    const cellImage = imageBuilder.build();
    cellImage.getAltTextTitle();
    cellImage.getAltTextDescription();
    cellImage.getContentUrl();
    cellImage.getUrl();

    console.assert(cellImage.valueType === SpreadsheetApp.ValueType.IMAGE);
};

// Blob test
const blob = () => {
    // $ExpectType Blob
    const blob = Utilities.newBlob("content", "application/json");
    blob.setContentType(null);

    // $ExpectType string
    const contentType = blob.getContentType();

    return contentType;
};

// DataSourceSheet test
const sheetDataSource = () => {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dss = sheet.asDataSourceSheet();

    // methods
    dss.addFilter("column1", {} as unknown as GoogleAppsScript.Spreadsheet.FilterCriteria);
    dss.asSheet();
    dss.autoResizeColumn("column1");
    dss.autoResizeColumns(["column1"]);
    dss.forceRefreshData();
    dss.getColumnWidth("column1");
    dss.getDataSource();
    dss.getFilters();
    dss.getSheetValues("column1");
    dss.getSheetValues("column1", 1, 1);
    dss.getSortSpecs();
    dss.getStatus();
    dss.refreshData();
    dss.removeFilters("column1");
    dss.removeSortSpec("column1");
    dss.setColumnWidth("column1", 100);
    dss.setColumnWidths(["column1"], 100);
    dss.setSortSpec("column1", true);
    dss.waitForCompletion(10);
};

// Drive Activity (Advanced service)
const driveActivity = () => {
    const response = DriveActivity.Activity.query({ pageSize: 10, filter: "time > 1452409200000" });
    for (const activity of response.activities) {
        const originalObject = activity.primaryActionDetail.create?.copy?.originalObject;
        if (originalObject) {
            console.log(originalObject.driveItem.file); // DriveFileReference.file is deprecated
            console.log(originalObject.driveItem.driveFile);
            console.log(originalObject.driveItem.folder); // DriveFileReference.folder is deprecated
            console.log(originalObject.driveItem.driveFolder);
        }
        for (const target of activity.targets) {
            const driveItem = target.driveItem;
            console.log(driveItem.file); // DriveFile.file is deprecated
            console.log(driveItem.driveFile);
            console.log(driveItem.folder); // DriveFile.folder is deprecated
            console.log(driveItem.driveFolder);
        }
    }
};

// People_v1 (Advanced Service)
const people = () => {
    // contacts batch methods
    const batchCreateContactsResponse = People.People.batchCreateContacts({
        readMask: "names,emailAddresses",
        contacts: [{
            contactPerson: {
                names: [{ displayName: "test user" }],
                emailAddresses: [{ value: "test@example.com" }],
            },
        }],
    });
    console.log(batchCreateContactsResponse.createdPeople[0].person.names);
    const batchUpdateContactsResponse = People.People.batchUpdateContacts({
        updateMask: "names,emailAddresses",
        readMask: "names,emailAddresses",
        contacts: {
            "people/test0123": {
                names: [{ displayName: "test user" }],
                emailAddresses: [{ value: "test-2@example.com" }],
            },
        },
    });
    console.log(batchUpdateContactsResponse.updateResult.names);
    People.People.batchDeleteContacts({ resourceNames: ["people/test1234"] });

    const image = DriveApp.getFileById("some-photo-data-file-id").getBlob();
    const baseImage = Utilities.base64Encode(image.getBytes());

    // contacts photo methods
    const updateContactPhotoResponse = People.People.updateContactPhoto({
        photoBytes: baseImage,
        sources: ["READ_SOURCE_TYPE_PROFILE", "READ_SOURCE_TYPE_CONTACT"],
    }, "people/test0123");
    console.log(updateContactPhotoResponse.person.names);
    const deleteContactPhotoResponse = People.People.deleteContactPhoto("people/test0123", {
        sources: ["READ_SOURCE_TYPE_PROFILE", "READ_SOURCE_TYPE_CONTACT"],
    });
    console.log(deleteContactPhotoResponse.person.names);

    // directory methods
    const searchDirectoryPeopleResponse = People.People.searchDirectoryPeople({
        query: "test@example.com",
        readMask: "names,emailAddresses",
        sources: ["DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE"],
    });
    console.log(searchDirectoryPeopleResponse.people[0].names);
    const listDirectoryPeopleResponse = People.People.listDirectoryPeople({
        readMask: "names,emailAddresses",
        sources: ["DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE"],
    });
    console.log(listDirectoryPeopleResponse.people[0].names);

    // other contacts methods
    const otherContactsListResponse = People.OtherContacts.list({
        readMask: "names,emailAddresses",
        sources: ["READ_SOURCE_TYPE_CONTACT", "READ_SOURCE_TYPE_PROFILE"],
    });
    console.log(otherContactsListResponse.otherContacts[0].names);
    const otherContactsSearchResponse = People.OtherContacts.search({
        query: "Foo",
        readMask: "names,emailAddresses",
    });
    console.log(otherContactsSearchResponse.people[0].names);
    const otherContactsCopyResponse = People.OtherContacts.copyOtherContactToMyContactsGroup({
        copyMask: "names,emailAddresses,phoneNumbers",
    }, "people/test0123");
    console.log(otherContactsCopyResponse.names);
};

// DataSourceFormula test
const sheetDataSourceFormula = () => {
    const sheet = SpreadsheetApp.getActiveSheet();
    const range = sheet.getRange("A1");
    const dataSourceFormula = range.getDataSourceFormula();

    // methods
    dataSourceFormula.forceRefreshData();
    dataSourceFormula.getAnchorCell();
    dataSourceFormula.getDataSource();
    dataSourceFormula.getDisplayValue();
    dataSourceFormula.getFormula();
    dataSourceFormula.getStatus();
    dataSourceFormula.refreshData();
    dataSourceFormula.setFormula("formula");
    dataSourceFormula.waitForCompletion(100);
};

// DataSourcePivotTable test
const sheetDataSourcePivotTable = () => {
    const sheet = SpreadsheetApp.getActiveSheet();
    const range = sheet.getRange("A1");
    const dataSourcePivotTables = range.getDataSourcePivotTables();

    // methods
    dataSourcePivotTables[0].addColumnGroup("column");
    dataSourcePivotTables[0].addFilter("column1", {} as unknown as GoogleAppsScript.Spreadsheet.FilterCriteria);
    dataSourcePivotTables[0].addPivotValue(
        "column1",
        {} as unknown as GoogleAppsScript.Spreadsheet.PivotTableSummarizeFunction,
    );
    dataSourcePivotTables[0].addRowGroup("column1");
    dataSourcePivotTables[0].asPivotTable();
    dataSourcePivotTables[0].forceRefreshData();
    dataSourcePivotTables[0].getDataSource();
    dataSourcePivotTables[0].getStatus();
    dataSourcePivotTables[0].refreshData();
    dataSourcePivotTables[0].waitForCompletion(100);
};

// Range test
const sheetRange = () => {
    const sheet = SpreadsheetApp.getActiveSheet();
    const range = sheet.getRange("A1");
    const dataSource = {} as unknown as GoogleAppsScript.Spreadsheet.DataSource;

    // methods
    let color = range.getBackgroundObject();
    range.setBackgroundObject(color);

    color = range.getFontColorObject();
    range.setFontColorObject(color);

    let colors = range.getBackgroundObjects();
    range.setBackgroundObjects(colors);

    colors = range.getFontColorObjects();
    range.setFontColorObjects(colors);

    range.getDataSourceFormula();
    range.getDataSourceFormulas();

    const dataSourcePivotTables = range.getDataSourcePivotTables();
    range.createDataSourcePivotTable(dataSource);
    range.createDataSourceTable(dataSource);
};

// Drive v3 API - Test File

function driveFileOperations() {
    // Create a new file
    const createdFile = Drive.Files.create({
        name: "test_create",
        description: "This is a description for a test file.",
        mimeType: MimeType.GOOGLE_DOCS, // Example MIME type
    });
    console.log("Created File:", createdFile.name, createdFile.id, createdFile.mimeType);

    // Get a file (replace with a valid Drive ID)
    const driveId = "YOUR_DRIVE_ID_HERE"; // <--- REPLACE with an actual Drive ID
    try {
        const drive = Drive.Drives.get(driveId); // Use Drives.get to get Drive metadata

        if (drive) { // Check if the Drive exists (Drives.get returns null if not found)
            // Update a file (using a blob)
            const blob = Utilities.newBlob(
                "Hello world!\nRepo Link: https://github.dev/DefinitelyTyped/DefinitelyTyped",
                MimeType.PLAIN_TEXT,
            );
            const updatedFile = Drive.Files.update({ name: "test_updated" }, createdFile.id, blob, {
                addParents: [drive.id],
            }); // addParents takes an array
            console.log("Updated File:", updatedFile.name, updatedFile.id);
        } else {
            console.error("Drive not found:", driveId);
        }
    } catch (e) {
        console.error("Error getting Drive:", e);
    }

    // Remove a file
    // Comment out to keep the test file
    Drive.Files.remove(createdFile.id);

    // Other operations (examples)

    // List files (Example showing how to use the 'q' parameter)
    const fileList = Drive.Files.list({
        q: "mimeType = 'application/vnd.google-apps.document' and trashed = false", // Example query
        pageSize: 10, // Optional: Limit the number of results
        fields: "files(id, name)", // Optional: List of fields in the response
    });

    if (fileList.files && fileList.files.length > 0) {
        console.log("Files found:");
        fileList.files.forEach(file => console.log(file.name, file.id));
    } else {
        console.log("No files found.");
    }

    // Get file metadata (example with optional fields)
    const metadata = Drive.Files.get(createdFile.id, { fields: "name,mimeType,webViewLink" });
    console.log("File Metadata:", metadata);

    // Copy a file
    const copiedFile = Drive.Files.copy({ name: "test_copy" }, createdFile.id);
    console.log("Copied File:", copiedFile.name, copiedFile.id);

    // (Don't forget to remove the copied file if you want to clean up)
    Drive.Files.remove(copiedFile.id);
}

// Example showing how to create a folder
function createFolder() {
    const folder = Drive.Files.create({
        name: "Test Folder",
        mimeType: MimeType.FOLDER,
    });
    console.log("Created Folder:", folder.name, folder.id);
}

function getFile() {
    const file = Drive.Files.get("FileID");
    console.log(file.name);
}

function getRawFile() {
    const fileBlob: string = Drive.Files.get("FileID", { alt: "media" });
    console.log(fileBlob);
}

// Example showing how to create a folder
function createDrive() {
    const drive = Drive.Drives.create({
        name: "Test Folder",
    }, "request-id");
    console.log("Created Folder:", drive.name, drive.id);
}

// Example: List Drives (Shared Drives)
function listDrives() {
    const driveList = Drive.Drives.list();
    if (driveList && driveList.drives && driveList.drives.length > 0) {
        console.log("Drives found:");
        driveList.drives.forEach(drive => {
            console.log(drive.name, drive.id);
        });
    } else {
        console.log("No shared Drives found.");
    }
}

// Example: Create a comment and a reply
function commentAndReply() {
    const comment = Drive.Comments.create({ content: "Comment text" }, "FileID", { fields: "id" });
    const reply = Drive.Replies.create({ content: "Reply text" }, "FileID", comment.id, { fields: "id" });
    console.log(reply.id);
}

// Example: List tabs (Google Docs)
function listTabs() {
    const allTabs = DocumentApp.openById("FileID").getTabs();
    console.log("Total tabs found: " + allTabs.length);

    const activeTabTitle = DocumentApp.getActiveDocument().getActiveTab().getTitle();
    console.log("Active tab title: " + activeTabTitle);
}

// Example: Set active tab (Google Docs)
function activeTab() {
    const tabId = DocumentApp.getActiveDocument().getActiveTab().getId();
    DocumentApp.getActiveDocument().setActiveTab(tabId);
    console.log("Set active tab to id: " + tabId);
}

// Follows the example at https://developers.google.com/apps-script/reference/document/body#findelementelementtype,-from
function optionalFields() {
    const body = DocumentApp.getActiveDocument()
        .getActiveTab()
        .asDocumentTab()
        .getBody();

    let searchResult: GoogleAppsScript.Document.RangeElement | null = null;
    let index = -1;

    while (
        (searchResult = body.findElement(
            DocumentApp.ElementType.PARAGRAPH,
            searchResult,
        ))
    ) {
        const element = searchResult.getElement();
        console.log("Found an element");
    }
}
