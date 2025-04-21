import {test, expect, describe} from 'vitest'
import { parse, clearLineOrderedList, getLevel } from './list'

describe("list-utils", () => {

    test("getLevel", () => {
        // Arrange
        const text = "      1. E"

        // Act
        const level = getLevel(text);

        // Assert
        expect(level).toBe(2)
    });

    test("Simple ordered list", () => {
        // Arrange
        const text = "1. A\n2. B\n3. C";

        // Act
        const { items } = parse(text, clearLineOrderedList);

        // Assert
        expect(items.length).toBe(3);

        expect(items[0].level).toBe(0)
        expect(items[0].text).toBe("A");
        expect(items[1].level).toBe(0)
        expect(items[1].text).toBe("B");
        expect(items[2].level).toBe(0)
        expect(items[2].text).toBe("C");
    });

    test("Ordered list with ending sub list", () => {
        // Arrange
        const text = "1. A\n2. B\n3. C\n   1. D";

        // Act
        const { items } = parse(text, clearLineOrderedList);

        // Assert
        expect(items.length).toBe(3);
        expect(items[2].text).toBe("C");
        expect(items[2].sub.length).toBe(1);
        expect(items[2].sub[0].level).toBe(1);
        expect(items[2].sub[0].text).toBe("D");
    });

    test("Ordered list with inner sub list", () => {
        // Arrange
        const text = "1. A\n2. B\n   1. C\n   2. D\n3. E";

        // Act
        const { items } = parse(text, clearLineOrderedList);

        // Assert
        expect(items.length).toBe(3);
        expect(items[1].sub.length).toBe(2);
        expect(items[1].sub[0].text).toBe("C");
        expect(items[1].sub[1].text).toBe("D");
        expect(items[2].text).toBe("E");
        expect(items[2].level).toBe(0);
    });

    test("Ordered list with sub sub list", () => {
        // Arrange
        const text = "1. A\n2. B\n   1. C\n   2. D\n      1. E";

        // Act
        const { items } = parse(text, clearLineOrderedList);

        // Assert
        expect(items.length).toBe(2);
        expect(items[1].sub.length).toBe(2);
        expect(items[1].text).toBe("B");
        expect(items[1].sub.length).toBe(2)
        expect(items[1].sub[0].text).toBe("C");
        expect(items[1].sub[1].text).toBe("D");
        expect(items[1].sub[1].level).toBe(1);
        expect(items[1].sub[1].sub.length).toBe(1);
        expect(items[1].sub[1].sub[0].level).toBe(2);
        expect(items[1].sub[1].sub[0].text).toBe("E");
    });

    test("Ordered list with start", () => {
        // Arrange
        const text = "4. A\n5. B\n6. C";

        // Act
        const { items, start } = parse(text, clearLineOrderedList);

        // Assert
        expect(start).toBe(4);
        expect(items.length).toBe(3);

        expect(items[0].level).toBe(0)
        expect(items[0].text).toBe("A");
        expect(items[1].level).toBe(0)
        expect(items[1].text).toBe("B");
        expect(items[2].level).toBe(0)
        expect(items[2].text).toBe("C");
    });

    test("Ordered list with start - Multi Digit", () => {
        // Arrange
        const text = "21. A\n5. B\n6. C";

        // Act
        const { items, start } = parse(text, clearLineOrderedList);

        // Assert
        expect(start).toBe(21);
        expect(items.length).toBe(3);

        expect(items[0].level).toBe(0)
        expect(items[0].text).toBe("A");
        expect(items[1].level).toBe(0)
        expect(items[1].text).toBe("B");
        expect(items[2].level).toBe(0)
        expect(items[2].text).toBe("C");
    });
});







