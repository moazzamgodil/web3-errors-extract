const executionReverted = async (err: any): Promise<string> => {
    const jsonObj = JSON.parse(
        err.message.slice(
            err.message.indexOf("{"),
            err.message.lastIndexOf("}") + 1
        )
    );
    if (jsonObj?.originalError) {
        return jsonObj.originalError.message;
    }
    return jsonObj;
}

export default executionReverted;