/**
 * Generates a unique slug depending on the value from name
 * @template T - The entity type (e.g., Album).
 * @param {Object} Entity - The entity class used to check for existing slugs.
 * @param {string} name - The user input for the name field from the data input.
 * @param {string} field - The field to check in the db table.
 * @returns {Promise<string>} - The generated unique slug
 */
export const generateUniqueSlug = async <T>(
  Entity: { findOneBy: (where: any) => Promise<T | null> },
  name: string,
  field: string
): Promise<string> => {
  const slugBase = name.trim().toLowerCase().replace(/\s+/g, "-");
  let slug = slugBase;
  let counter = 1;

  while (await Entity.findOneBy({ [field]: slug })) {
    slug = `${slugBase}-${counter++}`;
  }

  return slug;
};
