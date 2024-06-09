import isHotkey from "is-hotkey";
import isUrl from "is-url";
import { useMemo, useState } from "react";
import { Range, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

export default function RichEditor({ data, setData }) {

    const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), [])

    const initialValue = JSON.parse(data)

    const onKeyDown = e => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, e)) {
                e.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
            }
        }
    }

    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={value => {
                console.log(value)
                setData('profile_text', JSON.stringify(value))
            }}
        >
            <Editable
                renderElement={props => <Element {...props} />}
                renderLeaf={props => <Text {...props} />}
                onKeyDown={onKeyDown}
                style={{minHeight: 160, border:"1px solid rgb(209 213 219)", borderRadius:8}}
                className="p-2"
            />
        </Slate>
    )
}

const Element = ({ attributes, children, element }) => {
    // const selected = useSelected()
    switch (element.type) {
        case 'link':
            return (
                <a
                    {...attributes}
                    href={element.url}

                >
                    {/* <InlineChromiumBugfix /> */}
                    {children}
                    {/* <InlineChromiumBugfix /> */}
                </a>
            )
        case 'bulleted-list':
            return (
                <ul {...attributes}>
                    {children}
                </ul>
            )
        case 'numbered-list':
            return (
                <ol {...attributes}>
                    {children}
                </ol>
            )
        case 'list-item':
            return (
                <li {...attributes}>
                    {children}
                </li>
            )
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Text = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    return <span {...attributes}>{children}</span>
}

const withInlines = editor => {
    const { insertData, insertText, isInline, isElementReadOnly, isSelectable } = editor

    editor.isInline = element =>
        ['link', 'button', 'badge'].includes(element.type) || isInline(element)

    editor.isElementReadOnly = element =>
        element.type === 'badge' || isElementReadOnly(element)

    editor.isSelectable = element =>
        element.type !== 'badge' && isSelectable(element)

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')

        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const wrapLink = (editor, url) => {

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}