const fs = require('fs');
const path = require('path');

// Path to boost.podspec
const boostPodspecPath = path.join(
  __dirname,
  '../node_modules/react-native/third-party-podspecs/boost.podspec'
);

try {
  // Read the current podspec
  let podspecContent = fs.readFileSync(boostPodspecPath, 'utf8');

  // Modify the content - example of changing the source URL and hash
  podspecContent = podspecContent.replace(
    /spec\.source = {[\s\S]*?}/m,
    `spec.source = { :http => 'https://archives.boost.io/release/1.87.0/source/boost_1_87_0.tar.bz2',
                  :sha256 => 'af57be25cb4c4f4b413ed692fe378affb4352ea50fbe294a11ef548f4d527d89' }`
  );

  // Write back the modified content
  fs.writeFileSync(boostPodspecPath, podspecContent);
  console.log('Successfully patched boost.podspec');
} catch (error) {
  console.error('Error patching boost.podspec:', error);
}