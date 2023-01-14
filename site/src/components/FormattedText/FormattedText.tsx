import { Fragment } from 'preact';
import { useMemo } from 'preact/hooks';
import { textFormat } from './textFormat';

type Props = {
  text: string;
}

export const FormattedText = ({ text: formattedText }: Props) => {
  const text = useMemo(() => textFormat(formattedText), [formattedText]);

  return (
    <div>
      {text.map((node, index) => {
        if (node.tag === 'h1') {
          return (
            <Fragment key={index}>
              <div style={styles.line_h1}>
                {node.lines
                  ? node.lines.map((text, i, l) => (
                      <Fragment key={i}>
                        {text}
                        {i + 1 < l.length ? '\n' : ''}
                      </Fragment>
                    ))
                  : node.text}
              </div>
            </Fragment>
          );
        } else if (node.tag === 'h2') {
          return (
            <Fragment key={index}>
              <div style={styles.line_h2}>
                {node.lines
                  ? node.lines.map((text, i, l) => (
                      <Fragment key={i}>
                        {text}
                        {i + 1 < l.length ? '\n' : ''}
                      </Fragment>
                    ))
                  : node.text}
              </div>
            </Fragment>
          );
        } else if (node.tag === 'ul') {
          return (
            <div style={styles.line_ul} key={index}>
              {node.lines?.map((line, index) => (
                <div style={styles.line_li_box} key={index}>
                  <div style={styles.line_li_dot}>•</div>
                  <div style={styles.line_li_space}></div>
                  <div style={styles.line_li}>{line}</div>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <div style={styles.line} key={index}>
              {node.text}
            </div>
          );
        }
      })}
    </div>
  );
};

const style_line_text = {
  fontFamily: 'PT Sans', //var(--font-primary)',
  fontSize: 20,
};

const style_line = {
  ...style_line_text,
  paddingTop: 16,
  paddingLeft: 16,
  paddingRight: 16,
};

const styles = {
  line_text: style_line_text,
  line: style_line,
  line_h1: {
    ...style_line,
    // textTransform: 'uppercase' as any,
    fontSize: 32,
    paddingTop: 32,
    marginBottom: 18,
    textAlign: 'center' as any,
  },
  line_h2: {
    ...style_line,
    // textTransform: 'uppercase' as any,
    fontSize: 26,
    paddingTop: 32,
    textAlign: 'center' as any,
  },
  line_ul: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  line_li: {
    ...style_line_text,
    paddingBottom: 4,
    flexGrow: 1,
    flex: 1,
    marginLeft: 20,
  },

  line_li_box: {
    position: 'relative' as any,
    flex: 1,
    flexDirection: 'row' as any,
  },
  line_li_space: {
    ...style_line_text,
  },
  line_li_dot: {
    ...style_line_text,
    position: 'absolute' as any,
    top: 0,
    left: 0,
  },
};
