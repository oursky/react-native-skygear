/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "ReactNativeConfig.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Sentry.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [self setupSentry];

    NSString *env = [ReactNativeConfig envFor:@"ENV_NAME"];
    NSLog(@"Current env = %@", env);

    NSURL *jsCodeLocation;
    RCTBundleURLProvider* sharedSettings = [RCTBundleURLProvider sharedSettings];

    // Change to your host ip without port number, when run in real device.
    sharedSettings.jsLocation = @"localhost";
    jsCodeLocation = [sharedSettings jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"HelloWorld"
                                                 initialProperties:nil
                                                     launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
}

- (void)setupSentry
{
    NSString *sentryDsn = [ReactNativeConfig envFor:@"SENTRY_DSN"];
    NSError *error = nil;
    SentryClient *client = [[SentryClient alloc] initWithDsn:sentryDsn didFailWithError:&error];
    SentryClient.sharedClient = client;
    [SentryClient.sharedClient startCrashHandlerWithError:&error];
    if (nil != error) {
        NSLog(@"%@", error);
    }
}

@end
