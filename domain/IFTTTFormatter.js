class IFTTTFormatter {
    constructor(source,id,url){
        this.source = source;
        this.id = id;
        this.url = url;
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
            if (typeof this.id !== 'undefined' && typeof this.url !== 'undefined') {
                response = {
                    "data": [
                        {
                            "id": this.id,
                            "url": this.url
                        }
                    ]
                };
            } else if (typeof this.id !== 'undefined') {
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