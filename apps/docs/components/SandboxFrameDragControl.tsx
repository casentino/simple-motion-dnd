export default function SandboxFrameDragControl() {
  return (
    <iframe
      src="https://codesandbox.io/embed/vqg9t2?view=preview&module=%2Fsrc%2FApp.tsx&hidenavigation=1"
      style={{
        width: '100%',
        height: '500px',
        border: '0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title="brave-monad"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
  );
}
