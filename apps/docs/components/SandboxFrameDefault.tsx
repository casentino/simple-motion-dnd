export default function SandboxFrameDefault() {
  return (
    <iframe
      src="https://codesandbox.io/embed/sptxn7?view=preview&module=%2Fsrc%2FApp.tsx&hidenavigation=1"
      style={{
        width: '100%',
        height: '500px',
        border: '0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title="lingering-rgb"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
}
