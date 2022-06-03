class Footer extends scomponent {
    constructor(props) {
        super(props);
        this.height = 60;
    }
    render() {
        return "";
        return `
            <div style="
                position: fixed;
                bottom: 0;
                display: flex;
                background-color: #f5f5f5;
                height: ${this.height}px;
                width: 100%;
                text-align: center;
                justify-content: center;
                align-items: center;
            ">
                Footer
            </div>
            <div style="height:${this.height}px;"></div>
        `
    }
}