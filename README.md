# MFMS MOBILE APP

#### 1. Clone and Install

```bash
# Clone the repo
git clone https://github.com/prisharpatel/mfms.git

# Navigate to clonned folder and install dependencies
yarn install

# Install Pods
cd ios
pod install
```

#### 2. Open RNS in your iOS simulator

Run this command to start the development server and to start your app on iOS simulator:
```
yarn run:ios
```
If this code doesn't work, make sure platform of iPhone is installed in XCode for simulator. 

open xcode --> command + "," --> platforms --> get iOS 17.2

for newer iphone simulator, use
```
yarn run:ios --simulator="iPhone 15"
```
