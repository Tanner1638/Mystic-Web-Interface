import React from "react";

export function LoadingModule() {

    return (
        <html>
            <head>
                <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
                <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900" />
            </head>
            
            <body class="u-body u-stick-footer">
                <section class="skrollable u-clearfix u-section-1 customPosition">
                    <div class="u-clearfix u-sheet u-sheet-1">
                        <h1 class="u-align-center u-custom-font u-text u-text-1 loading">Loading</h1>
                    </div>
                </section>
            </body>
        </html>
    );
}