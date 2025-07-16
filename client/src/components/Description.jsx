import React, { useMemo } from 'react';
import './Description.css';

const Description = ({
    text,
    size = 'small',
    align = 'left',
    className = ''
}) => {
    const containerClasses = useMemo(() => {
        const classes = ['description'];

        if (size) {
            classes.push(`description--${size}`);
        }

        if (align) {
            classes.push(`description--${align}`);
        }

        if (className) {
            classes.push(className);
        }

        return classes.join(' ');
    }, [size, align, className]);

    const processedText = useMemo(() => {
        if (!text) return '';

        let processed = text;

        processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        processed = processed.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
        processed = processed.replace(/_([^_]+)_/g, '<em>$1</em>');
        processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');
        processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        processed = processed.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
        processed = processed.replace(/^#{6} (.+)$/gm, '<h6>$1</h6>');
        processed = processed.replace(/^#{5} (.+)$/gm, '<h5>$1</h5>');
        processed = processed.replace(/^#{4} (.+)$/gm, '<h4>$1</h4>');
        processed = processed.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>');
        processed = processed.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>');
        processed = processed.replace(/^#{1} (.+)$/gm, '<h1>$1</h1>');
        processed = processed.replace(/^---$/gm, '<hr>');
        processed = processed.replace(/^\* (.+)$/gm, '<li>$1</li>');
        processed = processed.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

        processed = processed.replace(/(<li>.*<\/li>)/gs, (match) => {
            const items = match.match(/<li>.*?<\/li>/g);
            if (items) {
                const isNumbered = text.match(/^\d+\. /m);
                const tag = isNumbered ? 'ol' : 'ul';
                return `<${tag}>${items.join('')}</${tag}>`;
            }
            return match;
        });

        processed = processed.replace(/\n\n+/g, '</p><p>');
        processed = processed.replace(/\n/g, '<br>');

        if (processed && !processed.startsWith('<')) {
            processed = `<p>${processed}</p>`;
        }

        return processed;
    }, [text]);

    if (!text) {
        return null;
    }

    return (
        <div
            className={containerClasses}
            dangerouslySetInnerHTML={{ __html: processedText }}
        />
    );
};

export default Description;