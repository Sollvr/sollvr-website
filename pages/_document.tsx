import Document, { Html,Main } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <body>
          <Main />
        </body>
      </Html>
    )
  }
}

export default MyDocument