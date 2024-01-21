import { useCallback, useMemo, useRef, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import { useYooptaEditor, useYooptaPlugin } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from './handlers';

const RenderPlugin = ({ id, render, customEditor, options }) => {
  const yooEditor = useYooptaEditor();
  const plugin = useYooptaPlugin(id);
  const initialValue = useRef(plugin.value).current;
  const type = plugin.type;

  const slate = useMemo(() => {
    const editor = withHistory(withReact(createEditor()));
    if (options?.isVoid) editor.isVoid = (element) => element.type === type;

    return editor;
  }, []);

  const onChange = useCallback((data) => {
    yooEditor.updateBlock(id, data);
  }, []);

  if (typeof customEditor === 'function') {
    return customEditor({
      id,
      type,
      value: initialValue,
      editor: slate,
      onChange,
    });
  }

  const renderElement = (props: RenderElementProps) => render(props);

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <Slate editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          renderElement={renderElement}
          onKeyDown={EVENT_HANDLERS.onKeyDown(yooEditor, slate)}
          placeholder="Enter some rich text…"
        />
      </Slate>
    </div>
  );
};

export { RenderPlugin };
