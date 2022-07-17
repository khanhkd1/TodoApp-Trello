import React from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import EmojiProductivityIcon from "@atlaskit/icon/glyph/emoji/productivity";
import EditorRemoveIcon from "@atlaskit/icon/glyph/editor/remove";

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  &,
  &:hover {
    ${(p) =>
      p.iscompleted === "true" &&
      css`
        text-decoration: line-through;
      `}
  }

  .check-icon {
    &:hover {
      background-color: #e2e2e2;
      border-radius: 3px;
    }
  }

  .check-icon {
    &:hover {
      background-color: #e2e2e2;
      border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckBtnClick, onRemoveBtnClick }) {
  return (
    <ButtonStyled
      iscompleted={todo.isCompleted ? "true" : "false"}
      shouldFitContainer
      iconBefore={
        !todo.isCompleted && (
          <span className="check-icon" onClick={() => onCheckBtnClick(todo.id)}>
            <EmojiProductivityIcon />
          </span>
        )
      }
      iconAfter={
        <span className="remove-icon" onClick={() => onRemoveBtnClick(todo.id)}>
          <EditorRemoveIcon />
        </span>
      }
    >
      {todo.isCompleted
        ? `${todo.name} - Completed at ${todo.updatedAt}`
        : todo.name}
    </ButtonStyled>
  );
}
