'use client';

import React, { useRef, useState } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Undo,
  Redo,
} from '@mui/icons-material';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start typing...',
  minHeight = 400,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Convert plain text to HTML for initial load
  React.useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      // If value already contains HTML tags, use it directly
      if (value.includes('<')) {
        editorRef.current.innerHTML = value;
      } else {
        // Convert plain text to HTML
        const htmlContent = value
          .split('\n\n')
          .map(paragraph => {
            // Check if it's a numbered section
            if (/^\d+\./.test(paragraph.trim())) {
              const [title, ...rest] = paragraph.split('\n');
              return `<p><strong>${title}</strong></p>${rest.map(line => `<p>${line}</p>`).join('')}`;
            }
            return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
          })
          .join('');
        editorRef.current.innerHTML = htmlContent;
      }
    }
  }, [value]);

  return (
    <Paper
      elevation={0}
      sx={{
        border: isFocused ? '2px solid #2164ef' : '1px solid #E9EAEB',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          p: 1,
          backgroundColor: '#FAFAFA',
          borderBottom: '1px solid #E9EAEB',
          flexWrap: 'wrap',
        }}
      >
        <Tooltip title="Bold">
          <IconButton
            size="small"
            onClick={() => execCommand('bold')}
            sx={{ '&:hover': { backgroundColor: '#E9EAEB' } }}
          >
            <FormatBold sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Italic">
          <IconButton
            size="small"
            onClick={() => execCommand('italic')}
            sx={{ '&:hover': { backgroundColor: '#E9EAEB' } }}
          >
            <FormatItalic sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Underline">
          <IconButton
            size="small"
            onClick={() => execCommand('underline')}
            sx={{ '&:hover': { backgroundColor: '#E9EAEB' } }}
          >
            <FormatUnderlined sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <Tooltip title="Bullet List">
          <IconButton
            size="small"
            onClick={() => execCommand('insertUnorderedList')}
            sx={{ '&:hover': { backgroundColor: '#E9EAEB' } }}
          >
            <FormatListBulleted sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered List">
          <IconButton
            size="small"
            onClick={() => execCommand('insertOrderedList')}
            sx={{ '&:hover': { backgroundColor: '#E9EAEB' } }}
          >
            <FormatListNumbered sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <Tooltip title="Undo">
          <IconButton
            size="small"
            onClick={() => execCommand('undo')}
            sx={{ '&:hover': { backgroundColor: '#E9EAEB' } }}
          >
            <Undo sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton
            size="small"
            onClick={() => execCommand('redo')}
            sx={{ '&:hover': { backgroundColor: '#E9EAEB' } }}
          >
            <Redo sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Editor */}
      <Box
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        suppressContentEditableWarning
        sx={{
          p: 3,
          minHeight,
          maxHeight: 600,
          overflowY: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.8,
          color: '#181D27',
          outline: 'none',
          '&:empty:before': {
            content: `"${placeholder}"`,
            color: '#A4A7AE',
          },
          '& p': {
            margin: '0 0 1em 0',
          },
          '& strong': {
            fontWeight: 600,
          },
          '& ul, & ol': {
            paddingLeft: '1.5em',
            marginBottom: '1em',
          },
        }}
      />
    </Paper>
  );
}

