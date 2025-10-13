import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'; // nextra-theme-blog or your custom theme

// Get the default MDX components
const docsComponents = getDocsMDXComponents();

// Merge components
export function useMDXComponents(components?: any) {
  return {
    ...docsComponents,
    ...components,
  };
}
