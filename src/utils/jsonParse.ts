export const tryParseJSONObject = (jsonString: any) => {
    try {
        const jsonValue = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (jsonValue && typeof jsonValue === 'object') {
            return jsonValue;
        }
    } catch (e) {}

    return {};
};
