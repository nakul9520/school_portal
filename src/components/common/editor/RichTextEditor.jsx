import { useState } from "react";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { useTheme } from "@mui/material/styles";

import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import { isEmpty } from "lodash";
import { Editor } from "react-draft-wysiwyg";

import RGBColorChart from "./RGBColorChart.json";

const RichTextEditor = (props) => {
  const { name, value, setFieldValue, helperText } = props;

  const theme = useTheme();

  const blocksFromHTML = convertFromHTML(value ?? "");
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(() =>
    isEmpty(value ?? "")
      ? EditorState.createEmpty()
      : EditorState.createWithContent(state)
  );

  const [hasFocus, setHasFocus] = useState(false);

  const onEditorStateChange = async (eData) => {
    setEditorState(eData);
    const data = draftjsToHtml(convertToRaw(eData.getCurrentContent()));
    setFieldValue(name, data);
    if (!eData.getCurrentContent().hasText()) {
      setFieldValue(name, "");
    }
  };

  return (
    <Box component="div" className="w-100">
      <Editor
        toolbarHidden={false}
        name={name}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        onFocus={() => setHasFocus(true)}
        onBlur={() => {
          setHasFocus(false);
        }}
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbarClassName="toolbarClassName"
        wrapperStyle={{
          borderRadius: "0px",
          width: "100%",
          border: props.error
            ? `1px solid ${theme.palette.error.main}`
            : hasFocus
            ? `1px solid ${theme.palette.primary.main}`
            : "1px solid #0000003b",
          transition: "all .2s ease",
        }}
        editorStyle={{
          minHeight: "160px",
          margin: 0,
          padding: "0 14px",
          borderBottomRightRadius: "4px",
          borderBottomLeftRadius: "4px",
          borderTop: props.error
            ? `1px solid ${theme.palette.error.main}`
            : hasFocus
            ? `1px solid ${theme.palette.primary.main}`
            : "1px solid #0000003b",
          transition: "all .2s ease",
        }}
        toolbarStyle={{ marginTop: "5px" }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "remove",
            "history",
          ],
          inline: { inDropdown: false },
          blockType: {
            inDropdown: true,
            options: [
              "Normal",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
              "Blockquote",
              "Code",
            ],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            // inDropdown: true,
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          },
          list: { inDropdown: false },
          textAlign: { inDropdown: true },
          colorPicker: {
            popupClassName: "custom_color_picker_model",
            colors: RGBColorChart,
            title: "Color Picker",
          },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
      {helperText && (
        <FormHelperText error className="mx-3">
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default RichTextEditor;
