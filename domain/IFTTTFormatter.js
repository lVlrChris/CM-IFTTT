class IFTTTFormatter {
    constructor(source){
        this.source = source;
    }

    iftttResponse(){
        let response;
        if (!this.source) {
            console.log("No source");
            response = {
                "data": [
                    {
                        "id": "no id"
                    }
                ]
            };
        } else {
            if (typeof this.source.id !== 'undefined' && typeof this.source.url !== 'undefined') {
                response = {
                    "data": [
                        {
                            "id": this.source.id,
                            "url": this.source.url
                        }
                    ]
                };
            } else if (typeof this.source.id !== 'undefined') {
                response = {
                    "data": [
                        {
                            "id": "no id"
                        }
                    ]
                };
            }
        }
        return response;
    }
}

module.exports = IFTTTFormatter;