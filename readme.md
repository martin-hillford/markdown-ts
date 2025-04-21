# markdown-ts

This parser is specifically crafted to enhance the capabilities of MarkDown, going beyond the conventional syntax 
typically associated with it. Developed entirely in TypeScript, it ensures a clean and efficient implementation without 
any runtime dependencies, making it lightweight and easy to integrate into various projects.

For those looking to deepen their understanding of MarkDown syntax, we recommend visiting https://www.markdownguide.org, 
which serves as a comprehensive resource. However, it's important to note that our parser introduces a few notable 
exceptions and enhancements compared to the guidelines provided on markdownguide.org.  

## Supported MarkDown syntax

This section provides a comprehensive comparison between the syntax supported by the parser and that outlined on 
markdownguide.org. It highlights key differences and offers detailed explanations of any additional syntax features 
supported by the parser.

### Lists

This parser supports ordered lists, unordered lists, and sub-lists. However, it does not allow for the use of
unordered sub-lists within ordered lists, or vice versa.

### Links

This parser fully supports the link syntax detailed on markdownguide.org, except for the reference styles. 
Additionally, it provides a broader array of features that extend beyond those specifications. The complete syntax
support is as follows:

`[text](url width alignment blank video "title")`

- **text**      : The text that will be displayed.
- **width**     : The width of the image, specified either as a pixel value (e.g., 250px) or as a percentage of the parent element (e.g., 75%).
- **alignment** : Use the keyword *left* or *right* for alignment. If no keyword is provided, the default alignment will be applied.
- **blank**     : If this keyword is included, the link will open in a new browser tab.
- **video**     : If this keyword is present, the parser will attempt to render the link as an embedded video from YouTube, Vimeo, or as an inline browser video.
- **title**     : Enclosed in double quotes, this is the title of the link that will be displayed when the user hovers over it.

### Html

Inline HTML is supported only when the option `allowHtml: true` is explicitly set; otherwise, all HTML will be escaped.

### Definition Lists

Definition lists are not currently supported.
If you would like to see this feature included in the parser, please submit a feature request.

### Task Lists

Task lists are not currently supported.
If you would like to see this feature included in the parser, please submit a feature request.

### Emoji

Emojis are currently supported only when provided via Unicode, as no specific commands have been implemented.

### Subscript & Superscript

Are supported, though through an alternative syntax. Please use `^(superscript text)` for <sup>superscript text</sup> 
and `~(subscript text)` for <sub>subscript text</sub> respectively. 

## Usage

To utilize the parser, simply execute the following command: `markdownToHtml(markdown)`. The result returned is a string 
containing HTML content, which can then be used to set the innerHTML of a div or the entire document.
To ensure proper styling please consult the style.css file.

Optionally, you can influence the behavior of the parser by setting various options. These are defined as follows:

```typescript
interface Options {
    getBlockParsers?: (context: Context) => IBlockParser[]
    getInlineParsers?: (context: Context) => IInlineParser[]
    variables? : Variable[]
    dir?: "ltr" | "rtl" | 'auto',
    lang?: string
    className?: string,
    defaultAlignment?: "left" | "right" | "justify"
    allowHtml?: boolean
    wrap?: boolean
}
```

Please consider the following properties, which can be utilized to customize the parser's behavior:

- **getBlockParsers**  : Implement this method to add custom block parsers. For further details, refer to the plugins.md file.
- **getInlineParsers** : Use this method to introduce custom inline parsers.   
                         Additional information is available in the plugins.md file.
- **variables**        : A collection of variables for substitution within the Markdown document. 
                         Each variable consists of a key and a render function that returns a string.
- **dir**              : Defines the text direction. If not specified, the browser will determine it.
                         Acceptable values are 'ltr' (left-to-right), 'rtl' (right-to-left), or 'auto'.
- **className**        : The CSS class to apply when wrapping the output in a div.
- **defaultAlignment** : Sets the default alignment for paragraphs. Possible values include 'left', 'right', or 'justify'.
- **allowHtml**        : When enabled (set to true), the input string is processed without any cleaning.
- **wrap**             : When enabled (set to true), the input is wrapped in a div. 
                         The class applied will be either the specified className or, if not provided, 'markDown'.

Please note that all of these options are optional and not necessary for the parser to function correctly.

## Contribute

If you would like to contribute by adding additional parsers, enhancing performance, or improving code quality, we 
encourage you to do so and submit a pull request! However, please note that pull requests lacking tests or that 
decrease code coverage will not be accepted.

## License

Copyright Martin Hillford, available under the MIT License.
