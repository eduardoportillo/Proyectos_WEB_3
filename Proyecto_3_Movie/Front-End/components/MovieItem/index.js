require("/Action/index.js")
class MovieItem extends scomponent {
    constructor(props) {
        super(props);
    }
    onLoad() {
    }

    render() {
        const style = {
            divAnuncio: `
                display: inline-block;
                position: relative;
                flex:1; 
                width:240px;
                height:360px;
                overflow:hidden;
                background-color: #f5f5f5;
                border-radius: 4px;
                align-items: center;
                margin: 8px;
            `,
            divBlur: `
                top: 0;
                position: absolute;
                width:100%;
                height:100%;
                background-image: url(${this.props.data.image});
                background-size: cover;
                filter: blur(8px);
                -webkit-filter: blur(8px);
            `,
            divNoBlur: `
                top: 0;
                position: absolute;
                width:100%;
                height:100%;
            `,
            divImagen: `
                filter:none;
                flex:1;
                display: flex;
                -webkit-filter: none;
                align-items: center;
                justify-content: center;
                height:320px;
                overflow:hidden;
            `,
            divInfo: `
                background-color: #00000066;
                padding: 4px;
            `
        };
        return `
        <div onClick="window.location.href='/movie/?id=${this.props.data.id}'"   style="${style.divAnuncio} ${this.props.style ?? ""}">
            <div style="${style.divBlur}"></div>
            <div style="${style.divNoBlur}">
                <h3 style="padding:4px; margin:0; height:24px; color:#fff;  background-color: #00000066;">${this.props.data.name}</h3>
                <div style="${style.divImagen}">
                    <img src=${this.props.data.image} alt="movie.img" width="100%" >
                </div>
            </div>
            
        </div>   
        `
    }

}

/*<div style="${style.divInfo}">
                    <p style="color: #fff; font-size: 12px;">${this.props.data.description}</p>
                </div>
                */
