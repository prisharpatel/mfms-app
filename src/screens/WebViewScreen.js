import React from 'react';
import { WebView } from 'react-native-webview';

export default function WebViewScreen({ route }) {
  const { url } = route.params;

  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
    />
  );
}